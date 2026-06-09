import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, KeyRound, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../auth/AuthContext';
import { ChatHeader, ChatInputBar, ChatMessageList } from '../features/chat/components';
import { useChatSession } from '../features/chat/hooks';
import { hasUsableChatAiAccess } from '../services/aiKeyService';
import { getFreeChatLevelBlockMessage, isFreeAiChatUser, isFreeChatLevelAllowed } from '../features/chat/freeChatLimits';

export default function ChatPage() {
  const { modeId, scenarioId: levelId } = useParams<{ modeId: string; scenarioId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasAiAccess, setHasAiAccess] = useState(() => hasUsableChatAiAccess(user?.plan));
  const isLevelLocked = isFreeAiChatUser(user) && !isFreeChatLevelAllowed(levelId);
  const chat = useChatSession({ modeId, levelId, navigate });

  useEffect(() => {
    const refreshGeminiKey = () => setHasAiAccess(hasUsableChatAiAccess(user?.plan));
    refreshGeminiKey();
    window.addEventListener('storage', refreshGeminiKey);
    window.addEventListener('focus', refreshGeminiKey);
    return () => {
      window.removeEventListener('storage', refreshGeminiKey);
      window.removeEventListener('focus', refreshGeminiKey);
    };
  }, [user?.plan]);

  if (!hasAiAccess || isLevelLocked) {
    return (
      <PageContainer className="min-h-[100dvh] bg-[#F8FBFD]">
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-3xl items-center justify-center px-5 py-10">
          <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <Lock size={28} />
            </div>
            <h1 className="mt-5 text-2xl font-black text-text-primary">{isLevelLocked ? 'Level ini untuk Pro' : 'AI Chat dikunci dulu'}</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-relaxed text-text-muted">
              {isLevelLocked
                ? getFreeChatLevelBlockMessage(levelId)
                : 'AI Chat memakai default Gemini Flash 2.5 dari Fluently. Coba refresh halaman jika akses belum aktif.'}
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate(isLevelLocked ? '/upgrade' : '/profile')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-primary-dark"
              >
                <KeyRound size={18} />
                {isLevelLocked ? 'Upgrade Pro' : 'Buka Profile'}
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-text-secondary transition hover:border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft size={18} />
                Kembali
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="h-[100dvh] overflow-hidden bg-white md:h-auto md:bg-transparent md:-mx-6 lg:-mx-8 xl:-mx-10">
      <div className="flex h-[100dvh] w-full gap-0 md:h-[calc(100vh-1.5rem)] md:gap-4 lg:gap-5 px-0 md:px-4 lg:px-6 pb-0 md:pb-4">

        {/* Main chat panel */}
        <div
          className="flex-1 flex flex-col bg-white md:rounded-3xl border-0 md:border border-gray-100 overflow-hidden min-w-0"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <ChatHeader
            title={chat.headerTitle}
            subtitle={chat.headerSubtitle}
            sessionEnded={chat.sessionEnded}
            onBack={chat.handleBack}
            onNewSession={chat.handleNewSession}
            onEndSession={chat.handleEndSession}
          />

          <ChatMessageList
            messages={chat.messages}
            isTyping={chat.isTyping}
            isGuidedMode={chat.isGuidedMode}
            isVocabularyMode={chat.isVocabularyMode}
            isGrammarMode={chat.isGrammarMode}
            isPronunciationMode={chat.isPronunciationMode}
            isReadingMode={chat.isReadingMode}
            isSpeakingMode={chat.isSpeakingMode}
            isWritingMode={chat.isWritingMode}
            targetLanguage={chat.targetLanguage}
            sessionEnded={chat.sessionEnded}
            vocabStage={chat.vocabStage}
            messagesEndRef={chat.messagesEndRef}
            onQuickAction={chat.handleQuickAction}
            onSelectTopic={chat.handleTopicSelected}
            onSelectGrammarTopic={chat.handleGrammarTopicSelected}
            onSelectPronunciationTopic={chat.handlePronunciationTopicSelected}
            onSelectReadingTopic={chat.handleReadingTopicSelected}
            onSelectSpeakingTopic={chat.handleSpeakingTopicSelected}
            onSelectWritingTopic={chat.handleWritingTopicSelected}
          />

          <ChatInputBar
            input={chat.input}
            placeholder={chat.inputPlaceholder}
            chatStarted={chat.chatStarted}
            sessionEnded={chat.sessionEnded}
            isRecording={chat.isRecording}
            inputDisabled={chat.inputDisabled}
            textareaRef={chat.textareaRef}
            onInputChange={chat.setInput}
            onSend={chat.handleSend}
            onToggleRecording={chat.toggleRecording}
          />
        </div>

      </div>
    </PageContainer>
  );
}
