import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../components/layout/PageContainer';
import { ChatHeader, ChatInputBar, ChatMessageList } from '../features/chat/components';
import { useChatSession } from '../features/chat/hooks';

export default function ChatPage() {
  const { modeId, scenarioId: levelId } = useParams<{ modeId: string; scenarioId: string }>();
  const navigate = useNavigate();
  const chat = useChatSession({ modeId, levelId, navigate });

  return (
    <PageContainer className="md:-mx-6 lg:-mx-8 xl:-mx-10">
      <div className="flex h-screen md:h-[calc(100vh-1.5rem)] gap-0 md:gap-4 lg:gap-5 px-0 md:px-4 lg:px-6 pb-0 md:pb-4">

        {/* Main chat panel */}
        <div
          className="flex-1 flex flex-col bg-white md:rounded-3xl border-x md:border border-gray-100 overflow-hidden min-w-0"
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
