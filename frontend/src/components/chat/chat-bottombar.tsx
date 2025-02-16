import { FileImage, Paperclip, SendHorizontal } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChatInput } from "./chat-input";
import { observer } from "mobx-react-lite";
import { Message } from "@/types/message";
import { Button } from "../ui/button";
import { SpeechButton } from "../speech/speech-button.widget";

export interface ChatBottombarProps {
  sendMessage: (m: Message) => void;
  isLoading: boolean;
}

const createMessage = (message: string): Message => ({
  id: Number(new Date()),
  isBot: false,
  timestamp: new Date().toISOString(),
  isLoading: false,

  message: message.trim(),
});

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export const ChatBottombar = observer(
  ({ sendMessage, isLoading }: ChatBottombarProps) => {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      setMessage(event.target.value);
    };

    const handleSend = useCallback((message: string) => {
      if (message.trim()) {
        const newMessage: Message = createMessage(message);
        sendMessage(newMessage);
        setMessage("");

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }, []);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const handleKeyPress = (
      event: React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend(message);
      }

      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        setMessage((prev) => prev + "\n");
      }
    };

    return (
      <div className="px-3 pt-4 pb-1 flex justify-between w-full items-center gap-2">
        <AnimatePresence initial={false}>
          <SpeechButton onSpeech={setMessage} transcriptEnd={handleSend} />

          <motion.div
            key="input"
            className="w-full relative"
            layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              opacity: { duration: 0.05 },
              layout: {
                type: "spring",
                bounce: 0.15,
              },
            }}
          >
            <ChatInput
              value={message}
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              placeholder="Задайте вопрос..."
              className="rounded-full"
            />
          </motion.div>

          {message.trim() && (
            <Button
              className="h-9 w-9 shrink-0"
              onClick={() => handleSend(message)}
              disabled={isLoading}
              variant="ghost"
              size="icon"
            >
              <SendHorizontal size={22} className="text-muted-foreground" />
            </Button>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
