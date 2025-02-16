import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/_auth/shop")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2 px-3">
      <h1 className="font-semibold">Товары за баллы</h1>
      <ul className="grid grid-cols-2 gap-4">
        <li className="flex flex-col gap-1 border rounded-2xl overflow-hidden">
          <img
            src="/mts-music.png"
            alt="mts music"
            className="w-full max-h-[100px] object-cover"
          />
          <p className="px-2 font-semibold">Месяц подписки на МТС Музыку</p>
          <div className="flex items-center gap-1 px-2">
            <Zap className="size-4" />
            50
          </div>
          <Button size="sm" className="m-2 mt-0 rounded-xl">
            Получить
          </Button>
        </li>
        <li className="flex flex-col gap-1 border rounded-2xl overflow-hidden">
          <img
            src="/mts-music.png"
            alt="mts music"
            className="w-full max-h-[100px] object-cover"
          />
          <p className="px-2 font-semibold">3 месяца подписки на МТС Музыку</p>
          <div className="flex items-center gap-1 px-2">
            <Zap className="size-4" />
            130
          </div>
          <Button size="sm" className="m-2 mt-0 rounded-xl">
            Получить
          </Button>
        </li>
        <li className="flex flex-col gap-1 border rounded-2xl overflow-hidden">
          <img
            src="/kion.png"
            alt="mts music"
            className="w-full max-h-[100px] object-cover"
          />
          <p className="px-2 font-semibold">Месяц подписки на кинотеатр КИОН</p>
          <div className="flex items-center gap-1 px-2">
            <Zap className="size-4" />
            100
          </div>
          <Button size="sm" className="m-2 mt-0 rounded-xl">
            Получить
          </Button>
        </li>
        <li className="flex flex-col gap-1 border rounded-2xl overflow-hidden">
          <img
            src="/kion.png"
            alt="mts music"
            className="w-full max-h-[100px] object-cover"
          />
          <p className="px-2 font-semibold">
            3 Месяца подписки на кинотеатр КИОН
          </p>
          <div className="flex items-center gap-1 px-2">
            <Zap className="size-4" />
            220
          </div>
          <Button size="sm" className="m-2 mt-0 rounded-xl">
            Получить
          </Button>
        </li>
      </ul>
    </div>
  );
}
