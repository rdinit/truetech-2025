import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { LoginForm } from "@/components/login/login-form";

const Page = () => {
  return (
    <div className="flex h-full">
      <LoginForm />
    </div>
  );
};

export const Route = createFileRoute("/login")({
  component: Page,
  validateSearch: zodValidator(
    z.object({
      redirect: fallback(z.string().optional(), undefined),
    }),
  ),
});
