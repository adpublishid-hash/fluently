import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ChatMessage } from '../../../types';
import { createAiMessage } from '../session';

type BuildAiText = (messages: ChatMessage[]) => string;

export function useAiReplyQueue(setMessages: Dispatch<SetStateAction<ChatMessage[]>>) {
  const [isTyping, setIsTyping] = useState(false);
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
  }, []);

  return {
    isTyping,
    sendAiReply,
    sendAiReplyFromMessages,
    clearPendingReply,
    stopTyping,
  };
}
