import { motion } from 'framer-motion';
import { Mic, Send } from 'lucide-react';
import type { RefObject } from 'react';

type ChatInputBarProps = {
  input: string;
  placeholder: string;
  chatStarted: boolean;
  sessionEnded: boolean;
  isRecording: boolean;
  inputDisabled?: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onToggleRecording: () => void;
};

export function ChatInputBar({
  input,
  placeholder,
  chatStarted,
  sessionEnded,
  isRecording,
  inputDisabled = false,
  textareaRef,
  onInputChange,
  onSend,
  onToggleRecording,
}: ChatInputBarProps) {
  const canSend = chatStarted && !sessionEnded && !inputDisabled && input.trim();
  const isTextareaDisabled = !chatStarted || sessionEnded || inputDisabled;

  return (
    <div className="bg-white border-t border-gray-100 px-3 sm:px-4 pt-3 pb-[max(0.75rem,calc(env(safe-area-inset-bottom)+0.75rem))] md:pb-4 shrink-0 z-10">
      <div className="w-full max-w-5xl mx-auto flex items-end gap-2.5">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onToggleRecording}
          disabled={!chatStarted || sessionEnded}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
            isRecording
              ? 'bg-red-50 border-red-200 text-red-500 animate-pulse'
              : 'bg-gray-50 border-gray-200 text-text-secondary hover:bg-primary/10 hover:border-primary/30 hover:text-primary'
          }`}
        >
          <Mic size={17} />
        </motion.button>

        <div className="flex-1 flex items-end bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              onInputChange(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            disabled={isTextareaDisabled}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[14px] text-text-primary placeholder:text-text-muted outline-none resize-none min-h-[26px] max-h-[100px] leading-relaxed self-center disabled:cursor-not-allowed"
            rows={1}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onSend}
          disabled={!canSend}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
            canSend
              ? 'bg-primary cursor-pointer hover:bg-primary-dark'
              : 'bg-gray-100 cursor-not-allowed'
          }`}
          style={canSend ? { boxShadow: '0 4px 12px rgba(126, 195, 230, 0.4)' } : {}}
        >
          <Send size={16} className={canSend ? 'text-white' : 'text-gray-400'} />
        </motion.button>
      </div>

      <p className="max-w-5xl mx-auto text-center text-[10px] text-text-muted mt-2.5 font-medium">
        {isRecording
          ? 'Listening... speak clearly, then pause to submit'
          : inputDisabled
            ? 'Pronunciation practice wajib memakai microphone'
            : 'Fluently AI · Always verify important translations'}
      </p>
    </div>
  );
}
