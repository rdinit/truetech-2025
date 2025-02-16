import { Chat } from "@/components/chat/chat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Chat />;
}
