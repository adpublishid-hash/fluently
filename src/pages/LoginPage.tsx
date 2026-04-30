import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, EyeOff, AlertCircle, Apple } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';

interface LoginPageProps {
  onLogin: () => void;
  onGoToRegister: () => void;
  onGoToForgotPassword: () => void;
}

export default function LoginPage({ onLogin, onGoToRegister, onGoToForgotPassword }: LoginPageProps) {
  const { t } = useLanguage();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors: Record<string, string> = {};
  if (!email.trim()) errors.email = t('login.errorEmailRequired');
  if (!password.trim()) errors.password = t('login.errorPasswordRequired');

  const showFieldError = (field: string) => (touched[field] || submitted) ? errors[field] : undefined;
  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmitted(true);
    setError('');

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('talky_remember', email);
      }
      onLogin();
    } else {
      setError(result.error ? t(result.error as any) : 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Brand Panel */}
      <div className="hidden md:flex w-[45%] lg:w-[40%] relative overflow-hidden flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #4FA3D1 0%, #2F86B5 55%, #1E6F9F 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-8 w-56 h-56 bg-white/15 rounded-full blur-3xl" />
        </div>
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute -inset-4 md:-inset-6 rounded-full border-4 border-white/15"
              animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
              <img src="/assets/mascot/Gemini_Generated_Image_rer4izrer4izrer4 1herooo.png" alt="Fluently Mascot" className="w-full h-full object-cover object-top scale-110" />
            </div>
          </motion.div>
          <p className="text-white/70 text-lg font-medium mt-2">Learn languages with AI</p>
        </motion.div>
        {/* Floating particles */}
        <motion.div className="absolute top-32 left-16 w-2 h-2 bg-white/30 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.div className="absolute bottom-40 right-20 w-3 h-3 bg-white/20 rounded-full"
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
        />
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-b from-[#F0FDF4] to-white md:from-white md:to-gray-50/30">
        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 py-8">
          <motion.div
            className="w-full max-w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <h2 className="text-[28px] md:text-3xl font-extrabold text-[#1A1A2E] mb-1">{t('login.title')}</h2>
            <p className="text-[15px] text-[#6B7280] font-medium mb-8">{t('login.subtitle')}</p>

            {/* Global Error */}
            {error && (
              <motion.div
                className="flex items-center gap-2 px-4 py-3 mb-5 bg-red-50 border border-red-200 rounded-xl"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-red-600">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('login.email')}</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    onBlur={() => markTouched('email')}
                    placeholder={t('login.emailPlaceholder')}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                      showFieldError('email') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#7EC3E6] focus:ring-4 focus:ring-[#7EC3E6]/15'
                    }`}
                    id="login-email"
                    autoFocus
                  />
                </div>
                {showFieldError('email') && (
                  <motion.div className="flex items-center gap-1.5 mt-1.5 ml-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
                    <span className="text-[12px] font-semibold text-red-500">{showFieldError('email')}</span>
                  </motion.div>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('login.password')}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    onBlur={() => markTouched('password')}
                    placeholder={t('login.passwordPlaceholder')}
                    className={`w-full px-4 pr-12 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                      showFieldError('password') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#7EC3E6] focus:ring-4 focus:ring-[#7EC3E6]/15'
                    }`}
                    id="login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {showFieldError('password') && (
                  <motion.div className="flex items-center gap-1.5 mt-1.5 ml-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
                    <span className="text-[12px] font-semibold text-red-500">{showFieldError('password')}</span>
                  </motion.div>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer select-none" onClick={(e) => e.stopPropagation()}>
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      rememberMe ? 'bg-[#7EC3E6] border-[#7EC3E6]' : 'border-gray-300 bg-white'
                    }`}
                    onClick={(e) => { e.stopPropagation(); setRememberMe(!rememberMe); }}
                  >
                    {rememberMe && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <span className="text-[13px] font-semibold text-[#6B7280]">{t('login.rememberMe')}</span>
                </label>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onGoToForgotPassword(); }}
                  className="text-[13px] font-bold text-[#7EC3E6] hover:underline cursor-pointer"
                >
                  {t('login.forgotPassword')}
                </button>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all cursor-pointer relative overflow-hidden ${
                  loading ? 'bg-[#7EC3E6]/70' : 'bg-[#7EC3E6] hover:bg-[#22B862]'
                }`}
                style={{ boxShadow: '0 6px 20px rgba(38, 199, 109, 0.35)' }}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  />
                ) : t('login.signIn')}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-bold text-[#9CA3AF] uppercase">{t('login.orContinueWith')}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
              >
                <Apple size={18} /> Apple
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center mt-6 text-sm text-[#6B7280]">
              {t('login.noAccount')}{' '}
              <button
                onClick={(e) => { e.stopPropagation(); onGoToRegister(); }}
                className="font-bold text-[#7EC3E6] cursor-pointer hover:underline"
              >
                {t('login.signUp')}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
