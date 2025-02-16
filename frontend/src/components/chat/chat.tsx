import { useEffect } from "react";
import { ChatList } from "./chat-list";
import { observer } from "mobx-react-lite";
import { Message } from "@/types/message";
import { observable } from "mobx";

const messages = observable<Message>([]);

export const Chat = observer(() => {
  const handleMessage = async (v: Message) => {
    messages.push(v);

    const botMessage = observable({
      id: v.id + 1,
      isBot: true,
      timestamp: new Date().toISOString(),
      isLoading: true,
      answerFor: v.message,
      // message: "С новым годом!",
    } as Message);
    messages.push(botMessage);

    const res: { answer: string } = await fetch(
      `/api/chat?prompt=${v.message}`,
      {
        method: "POST",
      },
    ).then((v) => v.json());

    botMessage.isLoading = false;
    botMessage.message = res.answer;
  };

  const goDeeper = (v: Message) => {
    v.isLoading = true;

    setTimeout(() => {
      v.botLink = "https://yandex.ru/";
      v.isLoading = false;
    }, 2000);
  };

  useEffect(() => {
    messages.clear();
  }, []);

  return (
    <ChatList
      goDeeper={goDeeper}
      messages={messages}
      isLoading={false}
      sendMessage={handleMessage}
    />
  );
});
