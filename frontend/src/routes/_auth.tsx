import { ErrorLayout } from "@/components/layouts/error.layout";
import { Navigation } from "@/components/navigation";
import { Header } from "@/components/navigation/header";
import { checkAuth } from "@/utils/routes/check-grant";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div className="grid grid-rows-[auto_1fr] relative size-full overflow-hidden">
      <Header />
      <div className="flex flex-col h-full overflow-auto">
        <Outlet />
        <Navigation />
      </div>
    </div>
  ),
  beforeLoad: checkAuth,
  errorComponent: ErrorLayout,
});
