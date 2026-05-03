const fs = require('fs');

const BASE_URL = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3000';
const CDP_URL = process.env.CDP_URL || 'http://127.0.0.1:9222';
const LIMIT = Number(process.env.AUDIT_LIMIT || 0);

function getRoutes() {
  const source = fs.readFileSync('src/App.tsx', 'utf8');
  const routes = [...source.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((route) => !route.includes(':') && !route.includes('*'));
  return [...new Set(['/', ...routes])].slice(0, LIMIT || undefined);
}

async function createTarget() {
  const response = await fetch(`${CDP_URL}/json/new?about:blank`, { method: 'PUT' });
  if (!response.ok) throw new Error(`Unable to create Chrome target: ${response.status}`);
  return response.json();
}

function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result || {});
      return;
    }

    const callbacks = listeners.get(message.method) || [];
    for (const callback of callbacks) callback(message.params || {});
  });

  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      const send = (method, params = {}) => new Promise((res, rej) => {
        const messageId = ++id;
        pending.set(messageId, { resolve: res, reject: rej });
        socket.send(JSON.stringify({ id: messageId, method, params }));
      });
      const on = (method, callback) => {
        const callbacks = listeners.get(method) || [];
        callbacks.push(callback);
        listeners.set(method, callbacks);
      };
      resolve({ send, on, close: () => socket.close() });
    });
    socket.addEventListener('error', reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const routes = getRoutes();
  const target = await createTarget();
  const cdp = await connect(target.webSocketDebuggerUrl);
  const failures = [];
  let currentErrors = [];

  cdp.on('Runtime.exceptionThrown', ({ exceptionDetails }) => {
    currentErrors.push(exceptionDetails?.exception?.description || exceptionDetails?.text || 'Runtime exception');
  });
  cdp.on('Runtime.consoleAPICalled', ({ type, args }) => {
    if (type === 'error') {
      currentErrors.push(args.map((arg) => arg.value || arg.description || '').join(' ').trim() || 'Console error');
    }
  });
  cdp.on('Log.entryAdded', ({ entry }) => {
    if (entry.level === 'error') currentErrors.push(entry.text || 'Log error');
  });

  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Log.enable');
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      try {
        localStorage.setItem('talky_session', JSON.stringify({ name: 'Demo User', email: 'demo@talky.app' }));
        localStorage.setItem('talky_user', JSON.stringify({ name: 'Demo User', email: 'demo@talky.app' }));
        localStorage.setItem('talky_onboarding_done', 'true');
      } catch (_) {}
    `,
  });

  for (const route of routes) {
    currentErrors = [];
    const url = `${BASE_URL}${route}`;
    try {
      await cdp.send('Page.navigate', { url });
      await sleep(900);
      const result = await cdp.send('Runtime.evaluate', {
        expression: `({
          title: document.title,
          bodyLength: document.body ? document.body.innerText.trim().length : 0,
          hasRoot: Boolean(document.getElementById('root')),
          body: document.body ? document.body.innerText.slice(0, 500) : ''
        })`,
        returnByValue: true,
      });
      const value = result.result?.value || {};
      const filteredErrors = currentErrors.filter((error) => {
        if (!error) return false;
        if (error.includes('Download the React DevTools')) return false;
        return true;
      });

      if (!value.hasRoot || value.bodyLength === 0 || filteredErrors.length) {
        failures.push({ route, errors: filteredErrors, bodyLength: value.bodyLength, body: value.body });
      }
      process.stdout.write('.');
    } catch (error) {
      failures.push({ route, errors: [error.message], bodyLength: 0, body: '' });
      process.stdout.write('F');
    }
  }

  cdp.close();
  console.log(`\nScanned ${routes.length} routes.`);
  if (failures.length) {
    console.log(JSON.stringify(failures, null, 2));
    process.exit(1);
  }
  console.log('No route runtime errors found.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
