import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from './components/layout/BottomNav';
import SidebarNav from './components/layout/SidebarNav';
import RightSidebar from './components/layout/RightSidebar';
import { CartProvider } from './shop/CartContext';

// Shop pages — code-split to keep main bundle fast
const ShopPage           = lazy(() => import('./pages/shop/ShopPage'));
const ProductDetailPage  = lazy(() => import('./pages/shop/ProductDetailPage'));
const CartPage           = lazy(() => import('./pages/shop/CartPage'));
const ShippingPage       = lazy(() => import('./pages/shop/ShippingPage'));
const CheckoutPage       = lazy(() => import('./pages/shop/CheckoutPage'));
const OrderSuccessPage   = lazy(() => import('./pages/shop/OrderSuccessPage'));
const AdminPage          = lazy(() => import('./pages/admin/AdminPage'));

function ShopFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Auth pages (root level â€” not moved)
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { AuthProvider, useAuth, type UserPersona } from './auth/AuthContext';

// Module pages — lazy-loaded so lesson/content bundles do not slow initial access
const ModulPage = lazy(() => import('./pages/module/ModulPage'));
const EnglishLessonRoute = lazy(() => import('./pages/module/english/EnglishLessonRoute'));
const BeginnerPage = lazy(() => import('./pages/module/english/beginner/BeginnerPage.tsx'));
const BeginnerVocabularyPage = lazy(() => import('./pages/module/english/beginner/vocabulary/VocabularyPage.tsx'));
const BeginnerGrammarPage = lazy(() => import('./pages/module/english/beginner/grammar/BeginnerGrammarPage.tsx'));
const BeginnerSpeakingPage = lazy(() => import('./pages/module/english/beginner/speaking/SpeakingPage'));
const BeginnerPronunciationPage = lazy(() => import('./pages/module/english/beginner/pronunciation/PronunciationPage.tsx'));
const BeginnerWritingPage = lazy(() => import('./pages/module/english/beginner/writing/BeginnerWritingPage'));
const BeginnerReadingPage = lazy(() => import('./pages/module/english/beginner/reading/BeginnerReadingPage'));
const BeginnerListeningPage = lazy(() => import('./pages/module/english/beginner/listening/BeginnerListeningPage'));
const ElementaryPage = lazy(() => import('./pages/module/english/elementary/ElementaryPage'));
const ElementaryListeningPage = lazy(() => import('./pages/module/english/elementary/listening/ElementaryListeningPage'));
const GrammarPage = lazy(() => import('./pages/module/english/elementary/grammar/GrammarPage'));
const ElemPronunciationPage = lazy(() => import('./pages/module/english/elementary/pronunciation/PronunciationPage'));
const ElemSpeakingPage = lazy(() => import('./pages/module/english/elementary/speaking/SpeakingPage'));
const ElemVocabularyPage = lazy(() => import('./pages/module/english/elementary/vocabulary/VocabularyPage'));
const ElementaryWritingPage = lazy(() => import('./pages/module/english/elementary/writing/ElementaryWritingPage'));
const ElementaryReadingPage = lazy(() => import('./pages/module/english/elementary/reading/ElementaryReadingPage'));
const IntermediatePage = lazy(() => import('./pages/module/english/intermediate/IntermediatePage'));
const InterGrammarPage = lazy(() => import('./pages/module/english/intermediate/grammar/GrammarPage'));
const InterSpeakingPage = lazy(() => import('./pages/module/english/intermediate/speaking/SpeakingPage'));
const InterVocabularyPage = lazy(() => import('./pages/module/english/intermediate/vocabulary/VocabularyPage'));
const InterPronunciationPage = lazy(() => import('./pages/module/english/intermediate/pronunciation/PronunciationPage'));
const InterReadingPage = lazy(() => import('./pages/module/english/intermediate/reading/ReadingPage'));
const InterListeningPage = lazy(() => import('./pages/module/english/intermediate/listening/ListeningPage'));
const InterWritingPage = lazy(() => import('./pages/module/english/intermediate/writing/WritingPage'));
const UpperInterPage = lazy(() => import('./pages/module/english/upper-intermediate/UpperInterPage'));
const UpperInterVocabularyPage = lazy(() => import('./pages/module/english/upper-intermediate/vocabulary/UpperInterVocabularyPage'));
const UpperInterPronunciationPage = lazy(() => import('./pages/module/english/upper-intermediate/pronunciation/UpperInterPronunciationPage'));
const UpperInterSpeakingPage = lazy(() => import('./pages/module/english/upper-intermediate/speaking/UpperInterSpeakingPage'));
const UpperInterGrammarPage = lazy(() => import('./pages/module/english/upper-intermediate/grammar/UpperInterGrammarPage'));
const UpperInterListeningPage = lazy(() => import('./pages/module/english/upper-intermediate/listening/UpperInterListeningPage'));
const UpperInterReadingPage = lazy(() => import('./pages/module/english/upper-intermediate/reading/UpperInterReadingPage'));
const UpperInterWritingPage = lazy(() => import('./pages/module/english/upper-intermediate/writing/UpperInterWritingPage'));
const AdvancedPage = lazy(() => import('./pages/module/english/advanced/AdvancedPage'));
const AdvancedGrammarPage = lazy(() => import('./pages/module/english/advanced/grammar/AdvancedGrammarPage'));
const AdvancedSpeakingPage = lazy(() => import('./pages/module/english/advanced/speaking/AdvancedSpeakingPage'));
const AdvancedListeningPage = lazy(() => import('./pages/module/english/advanced/listening/AdvancedListeningPage'));
const AdvancedReadingPage = lazy(() => import('./pages/module/english/advanced/reading/AdvancedReadingPage'));
const AdvancedWritingPage = lazy(() => import('./pages/module/english/advanced/writing/AdvancedWritingPage'));
const AdvancedVocabularyPage = lazy(() => import('./pages/module/english/advanced/vocabulary/AdvancedVocabularyPage'));
const AdvancedPronunciationPage = lazy(() => import('./pages/module/english/advanced/pronunciation/AdvancedPronunciationPage'));
const ProficiencyPage = lazy(() => import('./pages/module/english/proficiency/ProficiencyPage'));
const ProficiencyGrammarPage = lazy(() => import('./pages/module/english/proficiency/grammar/ProficiencyGrammarPage'));
const ProficiencySpeakingPage = lazy(() => import('./pages/module/english/proficiency/speaking/ProficiencySpeakingPage'));
const ProficiencyReadingPage = lazy(() => import('./pages/module/english/proficiency/reading/ProficiencyReadingPage'));
const ProficiencyWritingPage = lazy(() => import('./pages/module/english/proficiency/writing/ProficiencyWritingPage'));
const ProficiencyPronunciationPage = lazy(() => import('./pages/module/english/proficiency/pronunciation/ProficiencyPronunciationPage'));
const ProficiencyVocabularyPage = lazy(() => import('./pages/module/english/proficiency/vocabulary/ProficiencyVocabularyPage'));
const ProficiencyListeningPage = lazy(() => import('./pages/module/english/proficiency/listening/ProficiencyListeningPage'));
const ArabicLevelPage = lazy(() => import('./pages/module/arabic/ArabicLevelPage'));
const ArabicSkillPage = lazy(() => import('./pages/module/arabic/ArabicSkillPage'));
const ArabicLessonBridge = lazy(() => import('./pages/module/arabic/ArabicLessonBridge'));
const MandarinLevelPage = lazy(() => import('./pages/module/mandarin/MandarinLevelPage'));
const MandarinSkillPage = lazy(() => import('./pages/module/mandarin/MandarinSkillPage'));
const MandarinLessonPage = lazy(() => import('./pages/module/mandarin/MandarinLessonPage'));
const JapaneseLevelPage = lazy(() => import('./pages/module/japanese/JapaneseLevelPage'));
const JapaneseSkillPage = lazy(() => import('./pages/module/japanese/JapaneseSkillPage'));
const JapaneseLessonPage = lazy(() => import('./pages/module/japanese/JapaneseLessonPage'));

// Game pages (lazy — Phaser is ~3MB unpacked, only loaded when /game is visited)
const GamePage = lazy(() => import('./pages/game/GamePage'));
const GameCategoryPage = lazy(() => import('./pages/game/GameCategoryPage'));
const GameModePage = lazy(() => import('./pages/game/GameModePage'));
const GamePlayPage = lazy(() => import('./pages/game/GamePlayPage'));

// Latihan pages (folder: pages/latihan/)
const LatihanPage = lazy(() => import('./pages/latihan/LatihanPage'));
const LatihanSkillPage = lazy(() => import('./pages/latihan/LatihanSkillPage'));

// Ujian pages
const EnglishExamPage = lazy(() => import('./pages/ujian/english/EnglishExamPage'));
const EnglishToefl1Page = lazy(() => import('./pages/ujian/english/toefl/toefl1'));

// Chat pages — lazy, ChatPage pulls TTS service + scenario data
const ChatAIPage = lazy(() => import('./pages/chat/ChatAIPage'));
const ChatModePage = lazy(() => import('./pages/chat/ChatModePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));

// Other pages (root level — heavy ones lazy-loaded)
const RankPage       = lazy(() => import('./pages/RankPage'));
const ProfilePage    = lazy(() => import('./pages/ProfilePage'));
const UpgradePage    = lazy(() => import('./pages/UpgradePage'));
const AnalyticsPage  = lazy(() => import('./pages/AnalyticsPage'));
const GoalsPage      = lazy(() => import('./pages/GoalsPage'));
const NotesPage      = lazy(() => import('./pages/NotesPage'));
const IELTSPage      = lazy(() => import('./pages/ielts/IELTSPage'));
import ComingSoonPage from './pages/ComingSoonPage';
import { getPremiumBlock } from './utils/accessControl';

import TTSNotice from './components/shared/TTSNotice';
import GlobalFocusTimer from './components/shared/GlobalFocusTimer';

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

type AuthView = 'intro' | 'login' | 'register' | 'forgot';

function AppContent() {
  const { user, isAuthenticated, logout, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [authView, setAuthView] = useState<AuthView>(() => {
    const hasVisited = localStorage.getItem('talky_has_visited');
    return hasVisited ? 'login' : 'intro';
  });
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setShowOnboarding(false);
      return;
    }

    setShowOnboarding(!user.onboardingCompleted);
  }, [isAuthenticated, user]);

  const handleOnboardingComplete = async (persona?: UserPersona) => {
    if (!persona) return;

    const result = await completeOnboarding(persona);
    if (result.success) {
      setShowOnboarding(false);
      navigate('/modul', { replace: true });
    }
  };

  const handleLogin = () => {
    navigate('/modul', { replace: true });
  };

  const handleRegister = () => {
    setShowOnboarding(true);
    navigate('/modul', { replace: true });
  };

  const handleLogout = () => {
    logout();
    setAuthView('login');
    navigate('/modul');
  };

  if (location.pathname === '/terms') {
    window.location.replace('https://fluently.id/terms.html');
    return null;
  }

  if (location.pathname === '/privacy-policy') {
    window.location.replace('https://fluently.id/privacy.html');
    return null;
  }

  /* â”€â”€ Not authenticated â”€â”€ */
  if (!isAuthenticated) {
    if (authView === 'intro') {
      return (
        <OnboardingPage
          onComplete={() => {
            localStorage.setItem('talky_has_visited', 'true');
            setAuthView('login');
          }}
          onSignIn={() => {
            localStorage.setItem('talky_has_visited', 'true');
            setAuthView('login');
          }}
          introOnly
        />
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={authView}
          initial={{ opacity: 0, x: authView === 'register' ? 40 : authView === 'forgot' ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="min-h-screen"
        >
          {authView === 'login' && (
            <LoginPage
              onLogin={handleLogin}
              onGoToRegister={() => setAuthView('register')}
              onGoToForgotPassword={() => setAuthView('forgot')}
            />
          )}
          {authView === 'register' && (
            <RegisterPage
              onRegister={handleRegister}
              onGoToLogin={() => setAuthView('login')}
            />
          )}
          {authView === 'forgot' && (
            <ForgotPasswordPage
              onGoToLogin={() => setAuthView('login')}
            />
          )}
        </motion.div>
      </AnimatePresence>
    );
  }

  /* â”€â”€ Authenticated but onboarding survey pending â”€â”€ */
  if (showOnboarding) {
    return <OnboardingPage onComplete={handleOnboardingComplete} surveyOnly />;
  }

  /* â”€â”€ Authenticated + onboarded â†’ main app with folder-based routing â”€â”€ */
  const isShopCheckoutFlow =
    location.pathname.startsWith('/shop/cart') ||
    location.pathname.startsWith('/shop/shipping') ||
    location.pathname.startsWith('/shop/checkout') ||
    location.pathname.startsWith('/shop/order-success') ||
    location.pathname.startsWith('/shop/product/');
  const isChatSessionPage =
    location.pathname.split('/').filter(Boolean).length >= 3 &&
    location.pathname.startsWith('/chat/');
  const isExamPage = location.pathname.startsWith('/ujian/');

  const isDeepPage = location.pathname.includes('/lesson-') ||
                     location.pathname.includes('/play') ||
                     location.pathname.includes('/start') ||
                     isExamPage ||
                     isChatSessionPage ||
                     isShopCheckoutFlow;

  /* Pages where the right sidebar should appear */
  const showRightSidebar = [
    '/modul',
    '/game',
    '/latihan',
    '/chat',
    '/shop',
    '/admin',
  ].some((p) => location.pathname === p || location.pathname.startsWith(p + '/')) && !isShopCheckoutFlow;
  const premiumBlock = getPremiumBlock(location.pathname, location.search, user);

  return (
    <div className={`relative min-h-screen bg-transparent ${isExamPage ? '' : 'md:pl-[260px]'}`}>
      <TTSNotice />
      {/* Left sidebar: always visible on desktop, hidden on mobile for deep pages */}
      <div className={isExamPage ? 'hidden' : isDeepPage ? 'hidden md:block' : ''}>
        <SidebarNav onLogout={handleLogout} />
      </div>

      <div className="flex justify-center w-full">
        <div className={`w-full flex gap-8 ${isExamPage ? 'max-w-none px-0' : 'max-w-[430px] md:max-w-none xl:max-w-[1080px] md:px-8 xl:px-12'}`}>
          {/* â”€â”€ Center main column â”€â”€ */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={isExamPage ? '' : 'md:pt-8'}
              >
                {premiumBlock ? (
                  <Suspense fallback={<ShopFallback />}>
                    <UpgradePage block={premiumBlock} returnTo={`${location.pathname}${location.search}`} />
                  </Suspense>
                ) : (
                <Suspense fallback={<ShopFallback />}>
                <Routes location={location}>
                  {/* â•â•â•â•â•â•â• MODULE â•â•â•â•â•â•â• */}
                  <Route path="/modul" element={<ModulPage />} />

                  {/* English â€” Beginner (A1-A2) */}
                  <Route path="/modul/english/beginner" element={<BeginnerPage />} />
                  <Route path="/modul/english/beginner/vocabulary" element={<BeginnerVocabularyPage />} />
                  <Route path="/modul/english/beginner/grammar" element={<BeginnerGrammarPage />} />
                  <Route path="/modul/english/beginner/speaking" element={<BeginnerSpeakingPage />} />
                  <Route path="/modul/english/beginner/pronunciation" element={<BeginnerPronunciationPage />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/vocabulary/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/grammar/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/speaking/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/pronunciation/lesson-10" element={<EnglishLessonRoute />} />

                  {/* Beginner Writing */}
                  <Route path="/modul/english/beginner/writing" element={<BeginnerWritingPage />} />
                  <Route path="/modul/english/beginner/writing/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/writing/lesson-10" element={<EnglishLessonRoute />} />

                  {/* Beginner Reading */}
                  <Route path="/modul/english/beginner/reading" element={<BeginnerReadingPage />} />
                  <Route path="/modul/english/beginner/reading/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/reading/lesson-10" element={<EnglishLessonRoute />} />

                  {/* Beginner Listening */}
                  <Route path="/modul/english/beginner/listening" element={<BeginnerListeningPage />} />
                  <Route path="/modul/english/beginner/listening/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/beginner/listening/lesson-10" element={<EnglishLessonRoute />} />

                  <Route path="/modul/english/beginner/:skillId" element={<ComingSoonPage />} />

                  {/* English â€” Elementary (B1-B2) */}
                  <Route path="/modul/english/elementary" element={<ElementaryPage />} />

                  {/* Elementary Grammar */}
                  <Route path="/modul/english/elementary/grammar" element={<GrammarPage />} />
                  <Route path="/modul/english/elementary/grammar/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/grammar/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Elementary Pronunciation */}
                  <Route path="/modul/english/elementary/pronunciation" element={<ElemPronunciationPage />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/pronunciation/lesson-15" element={<EnglishLessonRoute />} />

                  {/* Elementary Speaking */}
                  <Route path="/modul/english/elementary/speaking" element={<ElemSpeakingPage />} />
                  <Route path="/modul/english/elementary/speaking/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/speaking/lesson-15" element={<EnglishLessonRoute />} />

                  {/* Elementary Vocabulary */}
                  <Route path="/modul/english/elementary/vocabulary" element={<ElemVocabularyPage />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/vocabulary/lesson-15" element={<EnglishLessonRoute />} />

                  {/* Elementary Writing */}
                  <Route path="/modul/english/elementary/writing" element={<ElementaryWritingPage />} />
                  <Route path="/modul/english/elementary/writing/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/writing/lesson-15" element={<EnglishLessonRoute />} />

                  {/* Elementary Reading */}
                  <Route path="/modul/english/elementary/reading" element={<ElementaryReadingPage />} />
                  <Route path="/modul/english/elementary/reading/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/reading/lesson-15" element={<EnglishLessonRoute />} />

                  {/* Elementary — Listening (A2) */}
                  <Route path="/modul/english/elementary/listening" element={<ElementaryListeningPage />} />
                  <Route path="/modul/english/elementary/listening/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/elementary/listening/lesson-10" element={<EnglishLessonRoute />} />

                  {/* Other elementary skills â†’ Coming Soon */}
                  <Route path="/modul/english/elementary/:skillId" element={<ComingSoonPage />} />

                  {/* English â€” Intermediate (B1-B2) */}
                  <Route path="/modul/english/intermediate" element={<IntermediatePage />} />
                  <Route path="/modul/english/intermediate/grammar" element={<InterGrammarPage />} />
                  <Route path="/modul/english/intermediate/speaking" element={<InterSpeakingPage />} />
                  <Route path="/modul/english/intermediate/vocabulary" element={<InterVocabularyPage />} />
                  <Route path="/modul/english/intermediate/pronunciation" element={<InterPronunciationPage />} />
                  <Route path="/modul/english/intermediate/reading" element={<InterReadingPage />} />
                  <Route path="/modul/english/intermediate/listening" element={<InterListeningPage />} />

                  {/* Intermediate Grammar */}
                  <Route path="/modul/english/intermediate/grammar/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/grammar/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Intermediate Speaking */}
                  <Route path="/modul/english/intermediate/speaking/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/speaking/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Intermediate Vocabulary */}
                  <Route path="/modul/english/intermediate/vocabulary/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/vocabulary/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Intermediate Pronunciation */}
                  <Route path="/modul/english/intermediate/pronunciation/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/pronunciation/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Intermediate Reading */}
                  <Route path="/modul/english/intermediate/reading/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/reading/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Intermediate Listening */}
                  <Route path="/modul/english/intermediate/listening/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/listening/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Intermediate Writing */}
                  <Route path="/modul/english/intermediate/writing" element={<InterWritingPage />} />
                  <Route path="/modul/english/intermediate/writing/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/intermediate/writing/lesson-20" element={<EnglishLessonRoute />} />

                  {/* Other intermediate skills â†’ Coming Soon */}
                  <Route path="/modul/english/intermediate/:skillId" element={<ComingSoonPage />} />

                  {/* English â€” Advanced (C1-C2) */}
                  <Route path="/modul/english/advanced" element={<AdvancedPage />} />
                  <Route path="/modul/english/advanced/:skillId" element={<ComingSoonPage />} />

                  {/* â•â•â•â•â•â•â• GAME â•â•â•â•â•â•â• */}
                  <Route path="/game" element={<GamePage />} />
                  <Route path="/game/:categoryId" element={<GameCategoryPage />} />
                  <Route path="/game/:categoryId/:modeId" element={<GameModePage />} />
                  <Route path="/game/:categoryId/:modeId/play" element={<GamePlayPage />} />

                  {/* â•â•â•â•â•â•â• LATIHAN â•â•â•â•â•â•â• */}
                  <Route path="/latihan" element={<LatihanPage />} />
                  <Route path="/latihan/basic" element={<Navigate to="/latihan" replace />} />
                  <Route path="/latihan/:skillId" element={<LatihanSkillPage />} />
                  <Route path="/latihan/:skillId/start" element={<ComingSoonPage />} />
                  <Route path="/latihan/:levelId/:skillId" element={<LatihanSkillPage />} />
                  <Route path="/latihan/:levelId/:skillId/start" element={<ComingSoonPage />} />

                  {/* UJIAN */}
                  <Route path="/ujian/english" element={<EnglishExamPage />} />
                  <Route path="/ujian/english/toefl/toefl1" element={<EnglishToefl1Page />} />
                  <Route path="/ujian/english/toefl1" element={<Navigate to="/ujian/english/toefl/toefl1" replace />} />

                  {/* â•â•â•â•â•â•â• CHAT AI â•â•â•â•â•â•â• */}
                  <Route path="/chat" element={<ChatAIPage />} />
                  <Route path="/chat/:modeId" element={<ChatModePage />} />
                  <Route path="/chat/:modeId/:scenarioId" element={<ChatPage />} />
                  <Route path="/chat/:modeId/:scenarioId/start" element={<ChatPage />} />

                  {/* SHOP */}
                  <Route path="/shop" element={<Suspense fallback={<ShopFallback />}><ShopPage /></Suspense>} />
                  <Route path="/shop/product/:productId" element={<Suspense fallback={<ShopFallback />}><ProductDetailPage /></Suspense>} />
                  <Route path="/shop/cart" element={<Suspense fallback={<ShopFallback />}><CartPage /></Suspense>} />
                  <Route path="/shop/shipping" element={<Suspense fallback={<ShopFallback />}><ShippingPage /></Suspense>} />
                  <Route path="/shop/checkout" element={<Suspense fallback={<ShopFallback />}><CheckoutPage /></Suspense>} />
                  <Route path="/shop/order-success" element={<Suspense fallback={<ShopFallback />}><OrderSuccessPage /></Suspense>} />

                  {/* ADMIN */}
                  <Route path="/admin" element={<Suspense fallback={<ShopFallback />}><AdminPage /></Suspense>} />

                  {/* â•â•â•â•â•â•â• OTHER â•â•â•â•â•â•â• */}
                  <Route path="/rank"      element={<RankPage />} />
                  <Route path="/profile"   element={<ProfilePage onLogout={handleLogout} />} />
                  <Route path="/upgrade"   element={<UpgradePage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/goals"     element={<GoalsPage />} />
                  <Route path="/notes"     element={<NotesPage />} />
                  <Route path="/ielts"     element={<IELTSPage />} />

                  {/* Default redirect */}
                  <Route path="*" element={<Navigate to="/modul" replace />} />
                // ============================================================
                  <Route path="/modul/english/upper-intermediate" element={<UpperInterPage />} />
                  <Route path="/modul/english/upper-intermediate/grammar" element={<UpperInterGrammarPage />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/grammar/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking" element={<UpperInterSpeakingPage />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/speaking/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary" element={<UpperInterVocabularyPage />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/vocabulary/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation" element={<UpperInterPronunciationPage />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/pronunciation/lesson-20" element={<EnglishLessonRoute />} />
                  
                  <Route path="/modul/english/advanced/grammar" element={<AdvancedGrammarPage />} />
                  <Route path="/modul/english/advanced/grammar/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/grammar/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking" element={<AdvancedSpeakingPage />} />
                  <Route path="/modul/english/advanced/speaking/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/speaking/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening" element={<AdvancedListeningPage />} />
                  <Route path="/modul/english/advanced/listening/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/listening/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading" element={<AdvancedReadingPage />} />
                  <Route path="/modul/english/advanced/reading/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/reading/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing" element={<AdvancedWritingPage />} />
                  <Route path="/modul/english/advanced/writing/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/writing/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary" element={<AdvancedVocabularyPage />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-21" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-22" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-23" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-24" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-25" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-26" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-27" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-28" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-29" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-30" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-31" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-32" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-33" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-34" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-35" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-36" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-37" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-38" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-39" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-40" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-41" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-42" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-43" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-44" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-45" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-46" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-47" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-48" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-49" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/vocabulary/lesson-50" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation" element={<AdvancedPronunciationPage />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/advanced/pronunciation/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency" element={<ProficiencyPage />} />
                  <Route path="/modul/english/proficiency/grammar" element={<ProficiencyGrammarPage />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/grammar/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking" element={<ProficiencySpeakingPage />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/speaking/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading" element={<ProficiencyReadingPage />} />
                  <Route path="/modul/english/proficiency/reading/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/reading/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing" element={<ProficiencyWritingPage />} />
                  <Route path="/modul/english/proficiency/writing/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/writing/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation" element={<ProficiencyPronunciationPage />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/pronunciation/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary" element={<ProficiencyVocabularyPage />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/vocabulary/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening" element={<ProficiencyListeningPage />} />
                  <Route path="/modul/english/proficiency/listening/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/proficiency/listening/lesson-20" element={<EnglishLessonRoute />} />
                  <Route path="/modul/arabic/:levelId" element={<ArabicLevelPage />} />
                  <Route path="/modul/arabic/:levelId/:skillId" element={<ArabicSkillPage />} />
                  <Route path="/modul/arabic/:levelId/:skillId/:lessonSlug" element={<ArabicLessonBridge />} />
                  <Route path="/modul/mandarin/:levelId" element={<MandarinLevelPage />} />
                  <Route path="/modul/mandarin/:levelId/:skillId" element={<MandarinSkillPage />} />
                  <Route path="/modul/mandarin/:levelId/:skillId/:lessonSlug" element={<MandarinLessonPage />} />
                  <Route path="/modul/japanese/:levelId" element={<JapaneseLevelPage />} />
                  <Route path="/modul/japanese/:levelId/:skillId" element={<JapaneseSkillPage />} />
                  <Route path="/modul/japanese/:levelId/:skillId/:lessonSlug" element={<JapaneseLessonPage />} />


                  {/* ── Upper-Intermediate Listening Routes ── */}
                  <Route path="/modul/english/upper-intermediate/listening" element={<UpperInterListeningPage />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/listening/lesson-20" element={<EnglishLessonRoute />} />

                  {/* ── Upper-Intermediate Reading Routes ── */}
                  <Route path="/modul/english/upper-intermediate/reading" element={<UpperInterReadingPage />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/reading/lesson-20" element={<EnglishLessonRoute />} />

                  {/* ── Upper-Intermediate Writing Routes ── */}
                  <Route path="/modul/english/upper-intermediate/writing" element={<UpperInterWritingPage />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-1" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-2" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-3" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-4" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-5" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-6" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-7" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-8" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-9" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-10" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-11" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-12" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-13" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-14" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-15" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-16" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-17" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-18" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-19" element={<EnglishLessonRoute />} />
                  <Route path="/modul/english/upper-intermediate/writing/lesson-20" element={<EnglishLessonRoute />} />

                </Routes>
                </Suspense>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* â”€â”€ Right sidebar (desktop xl+) â”€â”€ */}
          {showRightSidebar && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="hidden xl:block pt-8"
            >
              <RightSidebar />
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom nav: always visible on non-deep pages; on deep pages only visible on desktop */}
      <div className={isDeepPage ? 'hidden' : ''}>
        <BottomNav onLogout={handleLogout} />
      </div>
      {!isShopCheckoutFlow && <GlobalFocusTimer />}
    </div>
  );
}

function AppPreloader() {
  return (
    <motion.div
      key="app-preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F8FBFF]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(126,195,230,0.28),transparent_32%),radial-gradient(circle_at_72%_72%,rgba(255,221,244,0.42),transparent_30%)]" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] bg-white shadow-[0_20px_50px_rgba(79,163,209,0.22)]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            className="h-12 w-12 rounded-full border-[5px] border-[#D6E9FE] border-t-[#4FA3D1]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="text-3xl font-extrabold text-[#1A1A2E]"
        >
          Fluently
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-2 text-sm font-semibold text-[#6B7280]"
        >
          Menyiapkan pengalaman belajar...
        </motion.p>

        <div className="mt-7 h-2 w-48 overflow-hidden rounded-full bg-white shadow-inner">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.15, ease: 'easeInOut' }}
            className="h-full w-28 rounded-full bg-[#4FA3D1]"
          />
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPreloading(false);
    }, 450);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isPreloading ? (
        <AppPreloader />
      ) : (
        <AuthProvider key="app-content">
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      )}
    </AnimatePresence>
  );
}

export default App;
