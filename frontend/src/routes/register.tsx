import { RegistrationForm } from "@/components/login/register-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full">
      <RegistrationForm />
    </div>
  );
}
