import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from './AuthContext';

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  '100262738239-agmh7d6rkaficdvrfm2nbfbilne5m8k9.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              type?: 'standard' | 'icon';
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              width?: number;
              logo_alignment?: 'left' | 'center';
            },
          ) => void;
        };
      };
    };
  }
}

let googleScriptPromise: Promise<void> | null = null;

function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;

  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Google script failed')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google script failed'));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

export function getGoogleAuthFallbackUrl() {
  const redirectUri = `${window.location.origin}/`;
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'id_token',
    scope: 'openid email profile',
    prompt: 'select_account',
    nonce: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export default function GoogleAuthButton({
  mode,
  onSuccess,
  className = '',
}: {
  mode: 'login' | 'register';
  onSuccess: (isNewUser?: boolean) => void;
  className?: string;
}) {
  const { loginWithGoogle } = useAuth();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const fallbackUrl = useMemo(() => (typeof window === 'undefined' ? '#' : getGoogleAuthFallbackUrl()), []);

  useEffect(() => {
    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !buttonRef.current || !window.google?.accounts?.id) return;
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: async (response) => {
            if (!response.credential) {
              setError('Google credential tidak ditemukan.');
              return;
            }

            setLoading(true);
            setError('');
            const result = await loginWithGoogle(response.credential);
            setLoading(false);

            if (result.success) {
              onSuccess(result.isNewUser);
            } else {
              setError(result.error || 'Google login gagal.');
            }
          },
        });
        buttonRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: mode === 'register' ? 'signup_with' : 'signin_with',
          shape: 'rectangular',
          width: Math.min(380, buttonRef.current.offsetWidth || 380),
          logo_alignment: 'left',
        });
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError('Tombol Google belum bisa dimuat.');
      });

    return () => { cancelled = true; };
  }, [loginWithGoogle, mode, onSuccess]);

  return (
    <div className={className} onClick={(event) => event.stopPropagation()}>
      <div className="relative flex min-h-[46px] w-full items-center justify-center rounded-xl border-2 border-gray-200 bg-white">
        <div ref={buttonRef} className="flex w-full justify-center overflow-hidden rounded-xl" />
        {!ready && !error && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white text-sm font-bold text-[#667085]">
            Memuat Google...
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 text-sm font-bold text-[#667085] backdrop-blur-sm">
            Masuk dengan Google...
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
          <div className="flex items-start gap-2">
            <AlertCircle size={15} className="mt-0.5 shrink-0 text-amber-600" />
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-amber-700">{error}</p>
              <a
                href={fallbackUrl}
                className="mt-1 inline-flex items-center gap-1 text-[12px] font-black text-[#1E6F9F] underline underline-offset-2"
              >
                Buka fallback Google URL <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
