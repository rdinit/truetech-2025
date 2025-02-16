import { cn } from "@/utils/cn";
import { Button, buttonVariants } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { AlertCircle, AlertTriangle, Bell, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const Notifications = () => {
  return (
    <Drawer>
      <DrawerTrigger
        className={cn(
          buttonVariants({ size: "icon", variant: "secondary" }),
          "text-primary size-10",
        )}
      >
        <Bell aria-label="Уведомления" />
      </DrawerTrigger>
      <DrawerContent className="min-h-[70vh]">
        <DrawerHeader>
          <DrawerTitle>Уведомления</DrawerTitle>
          <DrawerDescription>
            Следите за вашими последними обновлениями
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 space-y-2">
          <Alert variant="destructive">
            <AlertTriangle />
            <div className="flex flex-col ml-2 mt-1">
              <AlertTitle>Отключение водоснабжения!</AlertTitle>
              <AlertDescription>
                С 1 по 2 февраля будет отключена горячая и холодная вода
              </AlertDescription>
            </div>
          </Alert>
          <Alert className="flex flex-col">
            <Zap />
            <div className="flex flex-col ml-2 mt-1">
              <AlertTitle>Требуется помощь!</AlertTitle>
              <AlertDescription>
                Здравствуйте! Мне нужно помочь донести сумку из квартиры до
                машины. Я колясочник, еду в больницу. Сам это сделать не смогу,
                она достаточно большая. Очень нужна ваша помощь!
                <Button size="sm" className="block mt-2">
                  Помочь
                </Button>
              </AlertDescription>
            </div>
          </Alert>
          <Alert>
            <AlertCircle />
            <div className="flex flex-col ml-2 mt-1">
              <AlertTitle>Перед подъездом гололёд!</AlertTitle>
              <AlertDescription>
                Будьте осторожны при выходе из подъезда
              </AlertDescription>
            </div>
          </Alert>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Отметить все как прочитанное</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
