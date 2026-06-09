import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, EyeOff, AlertCircle, Check, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import GoogleAuthButton from '../auth/GoogleAuthButton';

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
  const [phone, setPhone] = useState('');
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
  if (!phone.trim()) errors.phone = 'Nomor WhatsApp wajib diisi';
  else if (!/^[0-9]{8,13}$/.test(phone.replace(/\s/g, ''))) errors.phone = 'Masukkan nomor WhatsApp yang valid (8–13 digit)';
  if (password.length < 8) errors.password = t('signUp.errorPasswordMin');
  if (confirmPassword && password !== confirmPassword) errors.confirmPassword = t('signUp.errorPasswordMatch');

  const showError = (field: string) => (touched[field] || submitted) ? errors[field] : undefined;
  const strength = password.length > 0 ? getPasswordStrength(password) : null;
  const isValid = Object.keys(errors).length === 0 && confirmPassword.length > 0;

  const handleGoogleSuccess = useCallback(() => {
    onRegister();
  }, [onRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmitted(true);
    setGlobalError('');

    if (!isValid) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const result = await register(name, email, password, `62${phone.replace(/\D/g, '').replace(/^0+/, '')}`);
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

              {/* WhatsApp Number */}
              <div className="mb-3.5">
                <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">Nomor WhatsApp</label>
                <div className={`flex items-stretch overflow-hidden rounded-xl border-2 bg-white transition-all ${
                  showError('phone')
                    ? 'border-red-300 focus-within:border-red-400 focus-within:ring-4 focus-within:ring-red-100'
                    : 'border-gray-200 focus-within:border-[#6366F1] focus-within:ring-4 focus-within:ring-[#6366F1]/15'
                }`}>
                  <span className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-3 text-[15px] font-bold text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    +62
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => {
                      // strip non-digits and any leading 0
                      const digits = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                      setPhone(digits);
                    }}
                    onBlur={() => markTouched('phone')}
                    placeholder="812 3456 7890"
                    className="w-full bg-transparent px-4 py-3.5 text-[15px] font-semibold text-[#1A1A2E] outline-none placeholder:text-gray-300"
                    id="register-phone"
                    maxLength={13}
                  />
                </div>
                {showError('phone') && (
                  <motion.div className="flex items-center gap-1.5 mt-1.5 ml-1" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} className="text-red-500" /><span className="text-[12px] font-semibold text-red-500">{showError('phone')}</span>
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
            <GoogleAuthButton mode="register" onSuccess={handleGoogleSuccess} />

            {/* Login Link */}
            <p className="text-center mt-5 text-sm text-[#6B7280]">
              {t('signUp.alreadyHaveAccount')}{' '}
              <button onClick={(e) => { e.stopPropagation(); onGoToLogin(); }} className="font-bold text-[#6366F1] cursor-pointer hover:underline">
                {t('goals.signIn')}
              </button>
            </p>

            {/* Terms */}
            <p className="text-center mt-3 text-[11px] text-[#9CA3AF] leading-relaxed pb-4">
              {t('startLearning.terms')}{' '}
              <a href="https://fluently.id/terms.html" className="underline underline-offset-2 hover:text-[#6366F1]">
                {t('startLearning.termsLink')}
              </a>{' '}
              {t('startLearning.privacyIntro')}<br />
              <a href="https://fluently.id/privacy.html" className="underline underline-offset-2 hover:text-[#6366F1]">
                {t('startLearning.privacyLink')}
              </a>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
