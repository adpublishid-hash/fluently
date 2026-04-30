import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, EyeOff, AlertCircle, Check, Apple } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';

interface RegisterPageProps {
  onRegister: () => void;
  onGoToLogin: () => void;
}

function getPasswordStrength(pw: string): { score: number; key: 'signUp.passwordStrength.weak' | 'signUp.passwordStrength.fair' | 'signUp.passwordStrength.good' | 'signUp.passwordStrength.strong'; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score: 1, key: 'signUp.passwordStrength.weak', color: '#EF4444' };
  if (score === 2) return { score: 2, key: 'signUp.passwordStrength.fair', color: '#F59E0B' };
  if (score === 3) return { score: 3, key: 'signUp.passwordStrength.good', color: '#3B82F6' };
  return { score: 4, key: 'signUp.passwordStrength.strong', color: '#7EC3E6' };
}

export default function RegisterPage({ onRegister, onGoToLogin }: RegisterPageProps) {
  const { t } = useLanguage();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const markTouched = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const errors: Record<string, string> = {};
  if (!name.trim()) errors.name = t('signUp.errorNameRequired');
  if (!email.trim()) errors.email = t('signUp.errorEmailRequired');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t('signUp.errorEmailInvalid');
  if (password.length < 8) errors.password = t('signUp.errorPasswordMin');
  if (confirmPassword && password !== confirmPassword) errors.confirmPassword = t('signUp.errorPasswordMatch');

  const showError = (field: string) => (touched[field] || submitted) ? errors[field] : undefined;
  const strength = password.length > 0 ? getPasswordStrength(password) : null;
  const isValid = Object.keys(errors).length === 0 && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmitted(true);
    setGlobalError('');

    if (!isValid) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const result = await register(name, email, password);
    setLoading(false);

    if (result.success) {
      onRegister();
    } else {
      setGlobalError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Brand Panel */}
      <div className="hidden md:flex w-[45%] lg:w-[40%] relative overflow-hidden flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 60%, #4338CA 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-12 w-44 h-44 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-24 left-10 w-52 h-52 bg-white/15 rounded-full blur-3xl" />
        </div>
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute -inset-4 md:-inset-6 rounded-full border-4 border-white/15"
              animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
              <img src="/assets/mascot/Mascot.png" alt="Fluently Mascot" className="w-full h-full object-cover object-top scale-110" />
            </div>
          </motion.div>
          <p className="text-white/70 text-lg font-medium mt-2">Start your Fluently journey</p>
        </motion.div>
        <motion.div className="absolute top-28 left-20 w-2.5 h-2.5 bg-white/25 rounded-full"
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ repeat: Infinity, duration: 4.5 }}
        />
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-b from-[#EEF2FF] to-white md:from-white md:to-gray-50/30">
        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 py-6">
          <motion.div
            className="w-full max-w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[26px] md:text-3xl font-extrabold text-[#1A1A2E]">{t('signUp.title')}</h2>
            </div>
            <p className="text-[14px] text-[#6B7280] font-medium mb-6">{t('signUp.subtitle')}</p>

            {globalError && (
              <motion.div className="flex items-center gap-2 px-4 py-3 mb-4 bg-red-50 border border-red-200 rounded-xl" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-red-600">{globalError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
              {/* Name */}
              <div className="mb-3.5">
                <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('signUp.name')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => markTouched('name')}
                  placeholder={t('signUp.namePlaceholder')}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                    showError('name') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/15'
                  }`}
                  autoFocus
                  id="register-name"
                />
                {showError('name') && (
                  <motion.div className="flex items-center gap-1.5 mt-1.5 ml-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} className="text-red-500" /><span className="text-[12px] font-semibold text-red-500">{showError('name')}</span>
                  </motion.div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3.5">
                <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('signUp.email')}</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setGlobalError(''); }}
                    onBlur={() => markTouched('email')}
                    placeholder={t('signUp.emailPlaceholder')}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                      showError('email') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/15'
                    }`}
                    id="register-email"
                  />
                </div>
                {showError('email') && (
                  <motion.div className="flex items-center gap-1.5 mt-1.5 ml-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} className="text-red-500" /><span className="text-[12px] font-semibold text-red-500">{showError('email')}</span>
                  </motion.div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3.5">
                <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('signUp.password')}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => markTouched('password')}
                    placeholder={t('signUp.passwordPlaceholder')}
                    className={`w-full px-4 pr-12 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                      showError('password') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/15'
                    }`}
                    id="register-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" tabIndex={-1}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {strength && (
                  <motion.div className="mt-2 ml-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex gap-1.5 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} className="h-1.5 flex-1 rounded-full transition-all duration-300" style={{ backgroundColor: level <= strength.score ? strength.color : '#E5E7EB' }} />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: strength.color }}>{t(strength.key)}</span>
                  </motion.div>
                )}
                {showError('password') && (
                  <motion.div className="flex items-center gap-1.5 mt-1.5 ml-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} className="text-red-500" /><span className="text-[12px] font-semibold text-red-500">{showError('password')}</span>
                  </motion.div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('signUp.confirmPassword')}</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => markTouched('confirmPassword')}
                    placeholder={t('signUp.confirmPlaceholder')}
                    className={`w-full px-4 pr-12 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                      showError('confirmPassword') ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100' : confirmPassword && password === confirmPassword ? 'border-[#7EC3E6] bg-[#F0FDF4]/50' : 'border-gray-200 focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/15'
                    }`}
                    id="register-confirm-password"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" tabIndex={-1}>
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {confirmPassword && password === confirmPassword && (
                    <motion.div className="absolute right-12 top-1/2 -translate-y-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check size={18} className="text-[#7EC3E6]" />
                    </motion.div>
                  )}
                </div>
                {showError('confirmPassword') && (
                  <motion.div className="flex items-center gap-1.5 mt-1.5 ml-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} className="text-red-500" /><span className="text-[12px] font-semibold text-red-500">{showError('confirmPassword')}</span>
                  </motion.div>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all cursor-pointer ${
                  loading ? 'bg-[#6366F1]/70' : 'bg-[#6366F1] hover:bg-[#4F46E5]'
                }`}
                style={{ boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)' }}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                ) : t('signUp.createAccount')}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-bold text-[#9CA3AF] uppercase">{t('login.orContinueWith')}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                <Apple size={18} /> Apple
              </button>
              <button onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center mt-5 text-sm text-[#6B7280]">
              {t('signUp.alreadyHaveAccount')}{' '}
              <button onClick={(e) => { e.stopPropagation(); onGoToLogin(); }} className="font-bold text-[#6366F1] cursor-pointer hover:underline">
                {t('goals.signIn')}
              </button>
            </p>

            {/* Terms */}
            <p className="text-center mt-3 text-[11px] text-[#9CA3AF] leading-relaxed pb-4">
              {t('startLearning.terms')} <span className="underline cursor-pointer">{t('startLearning.termsLink')}</span> {t('startLearning.privacyIntro')}<br /><span className="underline cursor-pointer">{t('startLearning.privacyLink')}</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
