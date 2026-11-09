import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ChatMessage } from '../../../types';
import { createAiMessage } from '../session';

type BuildAiText = (messages: ChatMessage[]) => string;

export function useAiReplyQueue(setMessages: Dispatch<SetStateAction<ChatMessage[]>>) {
  const [isTyping, setIsTyping] = useState(false);
  // Set while a real AI request is in flight (not the short simulated typing delay).
  const [aiWaitStartedAt, setAiWaitStartedAt] = useState<number | null>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingReply = useCallback(() => {
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
      replyTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => () => clearPendingReply(), [clearPendingReply]);

  const sendAiReplyFromMessages = useCallback((buildText: BuildAiText, delay: number, id?: string) => {
    clearPendingReply();
    setIsTyping(true);
    setAiWaitStartedAt(null);
    replyTimeoutRef.current = setTimeout(() => {
      setMessages(prev => [...prev, createAiMessage(buildText(prev), id)]);
      setIsTyping(false);
      replyTimeoutRef.current = null;
    }, delay);
  }, [clearPendingReply, setMessages]);

  const sendAiReply = useCallback((text: string, delay = 1400 + Math.random() * 800) => {
    sendAiReplyFromMessages(() => text, delay);
  }, [sendAiReplyFromMessages]);

  const stopTyping = useCallback(() => {
    setIsTyping(false);
    setAiWaitStartedAt(null);
  }, []);

  // Shows the typing indicator while an AI request is in flight.
  const showTyping = useCallback(() => {
    clearPendingReply();
    setIsTyping(true);
    setAiWaitStartedAt((current) => current ?? Date.now());
  }, [clearPendingReply]);

  return {
    isTyping,
    aiWaitStartedAt,
    sendAiReply,
    sendAiReplyFromMessages,
    clearPendingReply,
    stopTyping,
    showTyping,
  };
}
