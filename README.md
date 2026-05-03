# Fluently Production Checklist

## Local validation

Run these before deploying:

```bash
npm run typecheck
npm run lint
npm run build
```

Frontend output is generated in `dist/`. The API server is in `server/` and starts with:

```bash
npm run server:start
```

## Required production environment

Copy `server/.env.example` to your hosting provider's environment variables and replace every placeholder:

- `CORS_ORIGINS`: your public frontend domains, comma-separated.
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: PostgreSQL connection.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`: first admin account bootstrap.
- `RAJAONGKIR_KEY`: shipping API key.
- `QRIS_IMAGE_URL`: public QRIS image URL.
- `SMTP_*`: email sending credentials.
- `ONESENDER_*`: WhatsApp notification credentials.

Do not commit real `.env` values or API keys.

## Recommended deployment shape

- Deploy frontend `dist/` to Vercel, Netlify, Cloudflare Pages, or static hosting.
- Deploy `server/` to Render, Railway, Fly.io, or a VPS Node service.
- Use managed PostgreSQL for production data.
- Configure the frontend host to proxy `/api/*` to the deployed API server, or serve frontend and API under the same domain.
- Enable HTTPS, database backups, and uptime monitoring before opening to public users.

## Public launch priorities

1. Replace development login flow with token/session-based auth before accepting real users.
2. Move all third-party secrets to production env vars.
3. Add payment verification instead of manual-only QRIS status changes.
4. Add error monitoring and analytics.
5. Test checkout, admin product variants, chat flows, microphone permissions, and mobile layout on real devices.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
