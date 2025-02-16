import { Button, buttonVariants } from "@/components/ui/button";
import { IconCard } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import { createFileRoute } from "@tanstack/react-router";
import {
  Accessibility,
  MapPin,
  ShoppingBasket,
  Trees,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { FC, PropsWithChildren } from "react";
import RatingIcon from "@/assets/rating.svg?react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ModalFC } from "@/components/ui/modal/types";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { showModal } from "@/components/ui/modal/show";

export const Route = createFileRoute("/_auth/map")({
  component: RouteComponent,
});

const Rating = () => (
  <div className="flex items-center gap-2 text-foreground">
    <RatingIcon />
    4,7
  </div>
);

const WheelChairChip: FC<PropsWithChildren<{ className?: string }>> = (x) => (
  <div
    className={cn(
      "flex items-center rounded-lg gap-2 px-2 py-0.5 text-sm text-foreground w-fit",
      x.className,
    )}
  >
    <Accessibility className="size-4" />
    {x.children}
  </div>
);

const Modal: ModalFC<{}> = (x) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Оценка места</DialogTitle>
        <DialogDescription>
          Это место доступно для людей с ограниченными возможностями?
        </DialogDescription>
      </DialogHeader>
      <div className="flex *:flex-1 gap-2">
        <Button className="bg-green-400 hover:bg-green-500">Да</Button>
        <Button className="bg-orange-400 hover:bg-orange-500">Частично</Button>
        <Button className="bg-slate-700 hover:bg-slate-800">Нет</Button>
      </div>
    </>
  );
};

function RouteComponent() {
  return (
    <div className="flex flex-col size-full">
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae75caadc4dfebe37dd324a34358eff8d78abd688446d39b9a799089353b0f2cd&amp;source=constructor"
        width="100%"
        height="100%"
        className="border-none size-full"
      ></iframe>
      <Drawer>
        <DrawerTrigger
          className={cn(buttonVariants(), "fixed bottom-20 left-3 right-3")}
        >
          <MapPin />
          Места
        </DrawerTrigger>
        <DrawerContent className="max-h-[70vh] h-full">
          <DrawerHeader>
            <DrawerTitle>Места</DrawerTitle>
          </DrawerHeader>
          <Tabs defaultValue="to-help" className="px-4">
            <TabsList className="w-full flex items-center *:flex-1">
              <TabsTrigger value="to-help">Помочь</TabsTrigger>
              <TabsTrigger value="to-visit">Посетить</TabsTrigger>
            </TabsList>
            <TabsContent value="to-visit" className="space-y-2">
              <button onClick={() => showModal(Modal, {})} className="w-full">
                <IconCard
                  icon={UtensilsCrossed}
                  title="Ресторан «Три кота»"
                  description={
                    <>
                      Чкалова, 124/1
                      <WheelChairChip className="bg-green-200 my-1">
                        Доступно
                      </WheelChairChip>
                      <Rating />
                    </>
                  }
                />
              </button>
              <button onClick={() => showModal(Modal, {})} className="w-full">
                <IconCard
                  icon={ShoppingBasket}
                  title="Парк «Только кот»"
                  description={
                    <>
                      Чкалова, 125
                      <WheelChairChip className="bg-orange-200 my-1">
                        Частично доступно
                      </WheelChairChip>
                      <Rating />
                    </>
                  }
                />
              </button>
              <button onClick={() => showModal(Modal, {})} className="w-full">
                <IconCard
                  icon={Trees}
                  title="Магазин «Четыре кота»"
                  description={
                    <>
                      Чкалова, 121
                      <WheelChairChip className="bg-gray-200 my-1">
                        Недоступно
                      </WheelChairChip>
                      <Rating />
                    </>
                  }
                />
              </button>
            </TabsContent>
            <TabsContent value="to-help">
              <Alert className="flex flex-col">
                <Zap />
                <div className="flex flex-col ml-2 mt-1">
                  <AlertTitle>Требуется помощь!</AlertTitle>
                  <AlertDescription>
                    Здравствуйте! Мне нужно помочь донести сумку из квартиры до
                    машины. Я колясочник, еду в больницу. Сам это сделать не
                    смогу, она достаточно большая. Очень нужна ваша помощь!
                    <span className="text-muted-foreground block mt-1">
                      Чкаловская 124/6
                    </span>
                    <Button size="sm" className="block mt-2">
                      Помочь
                    </Button>
                  </AlertDescription>
                </div>
              </Alert>
            </TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
