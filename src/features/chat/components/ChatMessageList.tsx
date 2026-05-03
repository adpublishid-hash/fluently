import { AnimatePresence, motion } from 'framer-motion';
import type { RefObject } from 'react';
import type { ChatMessage } from '../../../types';
import { quickActions } from '../freeChat';
import type { TargetLanguage } from '../targetLanguage';
import { ChatEmptyState } from './ChatEmptyState';
import { MessageContent } from './MessageContent';
import { TypingIndicator } from './TypingIndicator';

type ChatMessageListProps = {
  messages: ChatMessage[];
  isTyping: boolean;
  isGuidedMode: boolean;
  isVocabularyMode: boolean;
  isGrammarMode: boolean;
  isPronunciationMode: boolean;
  isReadingMode: boolean;
  isSpeakingMode: boolean;
  isWritingMode: boolean;
  targetLanguage: TargetLanguage;
  sessionEnded: boolean;
  vocabStage: string;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onQuickAction: (label: string) => void;
  onSelectTopic: (topic: string) => void;
  onSelectGrammarTopic: (topic: string) => void;
  onSelectPronunciationTopic: (topic: string) => void;
  onSelectReadingTopic: (topic: string) => void;
  onSelectSpeakingTopic: (topic: string) => void;
  onSelectWritingTopic: (topic: string) => void;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

export function ChatMessageList({
  messages,
  isTyping,
  isGuidedMode,
  isVocabularyMode,
  isGrammarMode,
  isPronunciationMode,
  isReadingMode,
  isSpeakingMode,
  isWritingMode,
  targetLanguage,
  sessionEnded,
  vocabStage,
  messagesEndRef,
  onQuickAction,
  onSelectTopic,
  onSelectGrammarTopic,
  onSelectPronunciationTopic,
  onSelectReadingTopic,
  onSelectSpeakingTopic,
  onSelectWritingTopic,
}: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-5">
        <AnimatePresence>
          {!isGuidedMode && messages.length <= 3 && (
            <motion.div
              className="lg:hidden grid grid-cols-2 gap-2 mb-5"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            >
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    className="flex items-center gap-2 bg-white rounded-2xl p-3 text-left cursor-pointer border border-gray-100"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.07 * i }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onQuickAction(action.label)}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: action.bgColor }}
                    >
                      <Icon size={14} style={{ color: action.color }} />
                    </div>
                    <span className="text-[11.5px] font-bold text-text-primary leading-tight">{action.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length === 0 ? (
          <ChatEmptyState />
        ) : (
          <>
            <div className="flex justify-center mb-5">
              <span className="text-[10px] font-bold text-text-muted bg-gray-100/80 px-3 py-1.5 rounded-full uppercase tracking-widest">
                Today
              </span>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'} gap-2 w-full group`}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                  >
                    {msg.isAi && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/20 flex-shrink-0 mt-1 shadow-sm">
                        <span className="text-[14px]">🐻</span>
                      </div>
                    )}
                    <div className={`flex flex-col ${msg.isAi ? 'items-start' : 'items-end'} gap-1 ${isGuidedMode && msg.isAi ? 'max-w-[96%] md:max-w-[92%]' : 'max-w-[82%] md:max-w-[68%]'}`}>
                      <div
                        className={`px-4 py-3 text-[13.5px] md:text-[14px] leading-relaxed whitespace-pre-line ${
                          msg.isAi
                            ? 'bg-white text-text-primary rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm'
                            : 'bg-primary text-white rounded-2xl rounded-tr-sm shadow-sm'
                        }`}
                      >
                        <MessageContent
                          text={msg.text}
                          targetLanguage={targetLanguage}
                          onSelectTopic={!sessionEnded && isVocabularyMode && vocabStage === 'ask-topic' ? onSelectTopic : undefined}
                          onSelectGrammarTopic={!sessionEnded && isGrammarMode && vocabStage === 'ask-topic' ? onSelectGrammarTopic : undefined}
                          onSelectPronunciationTopic={!sessionEnded && isPronunciationMode && vocabStage === 'ask-topic' ? onSelectPronunciationTopic : undefined}
                          onSelectReadingTopic={!sessionEnded && isReadingMode && vocabStage === 'ask-topic' ? onSelectReadingTopic : undefined}
                          onSelectSpeakingTopic={!sessionEnded && isSpeakingMode && vocabStage === 'ask-topic' ? onSelectSpeakingTopic : undefined}
                          onSelectWritingTopic={!sessionEnded && isWritingMode && vocabStage === 'ask-topic' ? onSelectWritingTopic : undefined}
                        />
                      </div>
                      <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium px-1">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && <TypingIndicator />}
            </div>
          </>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </div>
    </div>
  );
}
