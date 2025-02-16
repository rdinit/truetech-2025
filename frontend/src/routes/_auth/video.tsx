import { VideoPage } from "@/components/video";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/video")({
  component: RouteComponent,
});

function RouteComponent() {
  return <VideoPage />;
}
