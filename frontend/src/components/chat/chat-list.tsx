import { useRef, useEffect } from "react";
import { ChatBottombar, ChatBottombarProps } from "./chat-bottombar";
import { AnimatePresence, motion } from "motion/react";
import {
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "./chat-bubble";
import { ChatMessageList } from "./chat-message-list";
import { BotIcon, Link2, Search, User2Icon, Video } from "lucide-react";
import { observer } from "mobx-react-lite";
import { formatDate } from "@/utils/format/date";
import { cn } from "@/utils/cn";
import { Message } from "@/types/message";
import { buttonVariants } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface ChatListProps extends ChatBottombarProps {
  messages: Message[];
  goDeeper: (messageIndex: Message) => void;
}

export const ChatList = observer(
  ({ messages, goDeeper, ...props }: ChatListProps) => {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }, [messages.length, ...messages.map((v) => v.message)]);

    return (
      <div className="w-full overflow-y-auto h-full flex flex-col">
        {messages.length === 0 && (
          <div className="text-center gap-3 flex-col text-sm text-muted-foreground flex-1 h-full flex items-center justify-center">
            Начните диалог с ботом
            <Link
              to="/video"
              className={buttonVariants({ variant: "secondary" })}
            >
              <Video />
              Распознать видео
            </Link>
          </div>
        )}
        {messages.length > 0 && (
          <div className="flex-1 flex-col flex overflow-hidden">
            <ChatMessageList ref={messagesContainerRef}>
              <AnimatePresence>
                {messages.map((message, index) => {
                  const variant = message.isBot ? "received" : "sent";
                  return (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                      transition={{
                        opacity: { duration: 0.1 },
                        layout: {
                          type: "spring",
                          bounce: 0.3,
                          duration: index * 0.05 + 0.2,
                        },
                      }}
                      style={{ originX: 0.5, originY: 0.5 }}
                      className="flex flex-col gap-2 p-4"
                    >
                      {/* Usage of ChatBubble component */}
                      <ChatBubble variant={variant}>
                        <ChatBubbleAvatar className="hidden sm:flex">
                          {message.isBot ? <BotIcon /> : <User2Icon />}
                        </ChatBubbleAvatar>
                        <ChatBubbleMessage isLoading={message.isLoading}>
                          {message.message}
                          {message.botLink && (
                            <button
                              onClick={(e) =>
                                toast.info(
                                  "Тут появилась бы услуга, но мы не успели!",
                                )
                              }
                              className={cn(
                                buttonVariants({
                                  variant: "secondary",
                                  size: "sm",
                                }),
                                "flex items-center my-1 py-1",
                              )}
                            >
                              Перейти к услуге
                              <Link2 />
                            </button>
                          )}
                          {message.timestamp && (
                            <ChatBubbleTimestamp
                              timestamp={formatDate(
                                message.timestamp,
                                "MMMddHHmm",
                              )}
                            />
                          )}
                        </ChatBubbleMessage>
                        {message.isBot && (
                          <ChatBubbleActionWrapper>
                            {!message.botLink && (
                              <ChatBubbleAction
                                className={cn("size-7")}
                                icon={<Search className="size-4" />}
                                onClick={() => {
                                  goDeeper(message);
                                }}
                              />
                            )}
                          </ChatBubbleActionWrapper>
                        )}
                      </ChatBubble>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </ChatMessageList>
          </div>
        )}
        <ChatBottombar {...props} />
      </div>
    );
  },
);
