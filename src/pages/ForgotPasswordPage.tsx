import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye, EyeOff, AlertCircle, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../auth/AuthContext';

interface ForgotPasswordPageProps {
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

const stepVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

export default function ForgotPasswordPage({ onGoToLogin }: ForgotPasswordPageProps) {
  const { t } = useLanguage();
  const { userExists, resetPassword } = useAuth();

  const [step, setStep] = useState(0); // 0: email, 1: OTP, 2: new password, 3: success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer
  useEffect(() => {
    if (step === 1 && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, resendTimer]);

  // Step 1: Submit email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('login.errorEmailRequired'));
      return;
    }

    if (!(await userExists(email))) {
      setError(t('forgot.errorEmailNotFound'));
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep(1);
    setResendTimer(30);
  };

  // Step 2: OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const code = otp.join('');
    if (code.length !== 6) {
      setError(t('forgot.errorInvalidCode'));
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setStep(2);
  };

  // Step 3: New password
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');

    if (newPassword.length < 8) {
      setError(t('signUp.errorPasswordMin'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t('signUp.errorPasswordMatch'));
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = await resetPassword(email, newPassword);
    setLoading(false);

    if (result.success) {
      setStep(3);
    } else {
      setError(result.error || 'Reset failed');
    }
  };

  const strength = newPassword.length > 0 ? getPasswordStrength(newPassword) : null;

  return (
    <div className="flex min-h-screen">
      {/* Desktop Brand Panel */}
      <div className="hidden md:flex w-[45%] lg:w-[40%] relative overflow-hidden flex-col items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #B45309 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-24 left-14 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-28 right-10 w-48 h-48 bg-white/15 rounded-full blur-3xl" />
        </div>
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <ShieldCheck size={56} className="text-white" />
          </motion.div>
          <h1 className="text-white text-3xl font-black mt-6 tracking-tight">{t('forgot.title')}</h1>
          <p className="text-white/70 text-base font-medium mt-2 text-center max-w-[240px]">Secure your account</p>
        </motion.div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-b from-[#FFFBEB] to-white md:from-white md:to-gray-50/30">
        {/* Mobile back button */}
        <div className="md:hidden pt-6 px-6">
          <button
            onClick={(e) => { e.stopPropagation(); step === 0 ? onGoToLogin() : setStep((s) => Math.max(0, s - 1)); }}
            className="flex items-center gap-1.5 text-[#6B7280] font-semibold text-sm cursor-pointer hover:text-[#1A1A2E] transition-colors"
          >
            <ArrowLeft size={18} /> {t('forgot.backToLogin')}
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-20 py-8">
          <div className="w-full max-w-[420px]">
            {/* Desktop back */}
            <div className="hidden md:block mb-6">
              <button
                onClick={(e) => { e.stopPropagation(); step === 0 ? onGoToLogin() : setStep((s) => Math.max(0, s - 1)); }}
                className="flex items-center gap-1.5 text-[#6B7280] font-semibold text-sm cursor-pointer hover:text-[#1A1A2E] transition-colors"
              >
                <ArrowLeft size={18} /> {step === 0 ? t('forgot.backToLogin') : t('forgot.backToLogin')}
              </button>
            </div>

            {/* Progress */}
            {step < 3 && (
              <div className="flex gap-2 mb-8">
                {[0, 1, 2].map((s) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-[#F59E0B]' : 'bg-gray-200'}`} />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 0: Email */}
              {step === 0 && (
                <motion.div key="email-step" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <h2 className="text-[26px] font-extrabold text-[#1A1A2E] mb-2">{t('forgot.title')}</h2>
                  <p className="text-[14px] text-[#6B7280] font-medium mb-8">{t('forgot.subtitle')}</p>

                  {error && (
                    <motion.div className="flex items-center gap-2 px-4 py-3 mb-5 bg-red-50 border border-red-200 rounded-xl" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                      <span className="text-sm font-semibold text-red-600">{error}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleEmailSubmit} onClick={(e) => e.stopPropagation()}>
                    <div className="mb-6">
                      <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('forgot.email')}</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(''); }}
                          placeholder={t('forgot.emailPlaceholder')}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/15"
                          autoFocus
                          id="forgot-email"
                        />
                      </div>
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all cursor-pointer ${loading ? 'bg-[#F59E0B]/70' : 'bg-[#F59E0B] hover:bg-[#D97706]'}`}
                      style={{ boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)' }}
                      whileHover={!loading ? { scale: 1.01 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                      {loading ? (
                        <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                      ) : t('forgot.sendCode')}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* Step 1: OTP */}
              {step === 1 && (
                <motion.div key="otp-step" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <h2 className="text-[26px] font-extrabold text-[#1A1A2E] mb-2">{t('forgot.codeTitle')}</h2>
                  <p className="text-[14px] text-[#6B7280] font-medium mb-8">
                    {t('forgot.codeSubtitle')} <span className="font-bold text-[#1A1A2E]">{email}</span>
                  </p>

                  {error && (
                    <motion.div className="flex items-center gap-2 px-4 py-3 mb-5 bg-red-50 border border-red-200 rounded-xl" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                      <span className="text-sm font-semibold text-red-600">{error}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleOtpSubmit} onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-3 mb-8 justify-center">
                      {otp.map((digit, i) => (
                        <motion.input
                          key={i}
                          ref={(el) => { otpRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className={`w-12 h-14 text-center text-xl font-black rounded-xl border-2 outline-none transition-all bg-white ${
                            digit ? 'border-[#F59E0B] bg-[#FFFBEB]' : 'border-gray-200 focus:border-[#F59E0B]'
                          } focus:ring-4 focus:ring-[#F59E0B]/15`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        />
                      ))}
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all cursor-pointer ${loading ? 'bg-[#F59E0B]/70' : 'bg-[#F59E0B] hover:bg-[#D97706]'}`}
                      style={{ boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)' }}
                      whileHover={!loading ? { scale: 1.01 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                      {loading ? (
                        <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                      ) : t('forgot.verify')}
                    </motion.button>
                  </form>

                  <p className="text-center mt-5 text-sm text-[#6B7280]">
                    {resendTimer > 0 ? (
                      <span>{t('forgot.resendIn')} <span className="font-bold text-[#F59E0B]">{resendTimer}s</span></span>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); setResendTimer(30); }}
                        className="font-bold text-[#F59E0B] cursor-pointer hover:underline"
                      >
                        {t('forgot.resendCode')}
                      </button>
                    )}
                  </p>
                </motion.div>
              )}

              {/* Step 2: New Password */}
              {step === 2 && (
                <motion.div key="password-step" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <h2 className="text-[26px] font-extrabold text-[#1A1A2E] mb-2">{t('forgot.newPasswordTitle')}</h2>
                  <p className="text-[14px] text-[#6B7280] font-medium mb-8">{t('forgot.newPasswordSubtitle')}</p>

                  {error && (
                    <motion.div className="flex items-center gap-2 px-4 py-3 mb-5 bg-red-50 border border-red-200 rounded-xl" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                      <span className="text-sm font-semibold text-red-600">{error}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleResetSubmit} onClick={(e) => e.stopPropagation()}>
                    <div className="mb-4">
                      <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('forgot.newPassword')}</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                          placeholder={t('forgot.newPasswordPlaceholder')}
                          className="w-full px-4 pr-12 py-3.5 rounded-xl border-2 border-gray-200 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/15"
                          autoFocus
                          id="forgot-new-password"
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
                    </div>

                    <div className="mb-6">
                      <label className="block text-[13px] font-bold text-[#4A4A4A] mb-1.5 ml-1">{t('forgot.confirmNewPassword')}</label>
                      <div className="relative">
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                          placeholder={t('forgot.confirmNewPlaceholder')}
                          className={`w-full px-4 pr-12 py-3.5 rounded-xl border-2 text-[15px] font-semibold text-[#1A1A2E] outline-none transition-all placeholder:text-gray-300 bg-white ${
                            confirmPassword && newPassword === confirmPassword ? 'border-[#7EC3E6] bg-[#F0FDF4]/50' : 'border-gray-200 focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/15'
                          }`}
                          id="forgot-confirm-password"
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" tabIndex={-1}>
                          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {confirmPassword && newPassword === confirmPassword && (
                          <motion.div className="absolute right-12 top-1/2 -translate-y-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Check size={18} className="text-[#7EC3E6]" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all cursor-pointer ${loading ? 'bg-[#F59E0B]/70' : 'bg-[#F59E0B] hover:bg-[#D97706]'}`}
                      style={{ boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)' }}
                      whileHover={!loading ? { scale: 1.01 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                      {loading ? (
                        <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                      ) : t('forgot.resetPassword')}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div key="success-step" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="text-center py-8">
                  <motion.div
                    className="w-24 h-24 bg-[#7EC3E6] rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    style={{ boxShadow: '0 12px 32px rgba(126,195,230,0.3)' }}
                  >
                    <Check size={44} className="text-white" strokeWidth={3} />
                  </motion.div>
                  <motion.h2
                    className="text-[28px] font-extrabold text-[#1A1A2E] mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t('forgot.successTitle')}
                  </motion.h2>
                  <motion.p
                    className="text-[15px] text-[#6B7280] font-medium mb-10 max-w-[320px] mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {t('forgot.successSubtitle')}
                  </motion.p>
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); onGoToLogin(); }}
                    className="w-full py-4 rounded-2xl bg-[#7EC3E6] text-white font-bold text-[15px] cursor-pointer hover:bg-[#22B862] transition-all"
                    style={{ boxShadow: '0 6px 20px rgba(38, 199, 109, 0.35)' }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {t('forgot.goToLogin')}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
