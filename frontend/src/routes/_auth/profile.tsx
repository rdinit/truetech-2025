import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile")({
  component: ProfilePage,
});

import { Card } from "@/components/ui/card";
import { MailIcon, UserIcon, PhoneIcon, LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export default function ProfilePage() {
  return (
    <div className="bg-background px-4 pt-2 flex-1 flex-col flex">
      <header className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Личные данные</h1>
      </header>
      <main>
        <Card className="space-y-4 p-6">
          <div className="flex items-center space-x-3">
            <MailIcon
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Почта</p>
              <p className="text-base">kirill@duck.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <UserIcon
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-muted-foreground">ФИО</p>
              <p className="text-base">Иванов Иван Иванович</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <PhoneIcon
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Телефон
              </p>
              <p className="text-base">+7 (999) 123-45-67</p>
            </div>
          </div>
        </Card>
      </main>
      <Link to="/login" className={cn(buttonVariants(), "w-full mt-auto")}>
        <LogOut />
        Выход
      </Link>
    </div>
  );
}
