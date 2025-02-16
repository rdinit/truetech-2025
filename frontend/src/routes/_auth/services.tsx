import { HelpRequest } from "@/components/services/help-request";
import { ReportIssue } from "@/components/services/report-issue";
import { UkRequest } from "@/components/services/uk-request";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showModal } from "@/components/ui/modal/show";
import { ModalFC } from "@/components/ui/modal/types";
import { cn } from "@/utils/cn";
import { createFileRoute } from "@tanstack/react-router";
import { Home, UserCheck, Zap } from "lucide-react";
import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren } from "react";

const Chip: FC<PropsWithChildren<{ className?: string }>> = (x) => (
  <div
    className={cn(
      "flex bg-green-200 items-center rounded-lg gap-2 px-2 py-0.5 text-sm text-foreground w-fit",
      x.className,
    )}
  >
    <UserCheck className="size-4" />
    {x.children}
  </div>
);

const ApproveModal: ModalFC<{}> = (x) => (
  <>
    <DialogHeader>
      <DialogTitle>Ваша заявка была исполнена?</DialogTitle>
      <DialogDescription>
        Вы оставляли заявку на помощь, которую должна была оказать Анна Иванова.
        Расскажите, помогли ли вам?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="gap-3">
      <Button onClick={x.done} variant="destructive">
        Нет
      </Button>
      <Button onClick={x.done} size="lg">
        Да
      </Button>
    </DialogFooter>
  </>
);

const Card = () => {
  return (
    <button
      onClick={() => showModal(ApproveModal, {})}
      className="rounded-2xl border gap-2 p-4 bg-gray-100 text-left flex flex-col"
    >
      <div className="flex items-center gap-2">
        <Zap className="size-5" />
        Требуется помощь
      </div>
      <Chip>Подтверждено Анной Ивановной</Chip>
      <p className="text-sm text-muted-foreground">
        Здравствуйте! Мне нужно помочь донести сумку из квартиры до машины. Я
        колясочник, еду в больницу. Сам это сделать не смогу, она достаточно
        большая. Очень нужна ваша помощь!
        <span className="pt-1 block font-semibold">
          Дмитрий Алексеев, 105 кв., 24.02, 12:00
        </span>
      </p>
    </button>
  );
};

const RouteComponent = observer(() => {
  const address = "Старокрымская ул, дом 15";

  return (
    <div className="space-y-4 px-3">
      <div className="rounded-2xl border flex gap-3 p-4 pt-3">
        <Home className="mt-1" />
        <div>
          <h1 className="font-medium">Добрый день!</h1>
          <p className="text-muted-foreground text-sm">{address}</p>
        </div>
      </div>
      <section className="space-y-2 *:w-full">
        <h2 className="font-bold">Новая заявка</h2>
        <ReportIssue />
        <UkRequest />
        <HelpRequest />
      </section>
      <section className="space-y-2 *:w-full">
        <h2 className="font-bold">Мои заявки</h2>
        <Card />
      </section>
    </div>
  );
});

export const Route = createFileRoute("/_auth/services")({
  component: RouteComponent,
});
