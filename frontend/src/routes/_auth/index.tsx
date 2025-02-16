import { cn } from "@/utils/cn";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ClipboardCheck,
  DoorOpen,
  Gauge,
  Home,
  ReceiptText,
  Star,
  ThermometerSun,
  Wrench,
  Zap,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { FC, SVGProps } from "react";

// const Page = () => {
//   const [prev, setPrev] = useState<string[]>([]);
//   const [text, setText] = useState("");

//   const transcriptEnd = useCallback((text: string) => {
//     setPrev((v) => [...v, text]);
//     setText("");
//   }, []);

//   return (
//     <ul className="space-y-3 px-8 py-4 text-lg h-full">
//       {prev.map((v, i) => (
//         <li key={i}>
//           <pre>{v}</pre>
//         </li>
//       ))}
//       <li>
//         <pre>{text}</pre>
//       </li>
//       <li>
//         <SpeechButton onSpeech={setText} transcriptEnd={transcriptEnd} />
//       </li>
//     </ul>
//   );
// };

const cards: {
  title: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: "Подписки",
    icon: Star,
  },
  {
    title: "Услуги от УК",
    icon: ClipboardCheck,
  },
  {
    title: "Отопление",
    icon: ThermometerSun,
  },
  {
    title: "Ремонт квартиры",
    icon: Wrench,
  },
  {
    title: "Окна и двери",
    icon: DoorOpen,
  },
  {
    title: "Согласование документов",
    icon: ReceiptText,
  },
  {
    title: "Обслуживание счетчиков",
    icon: Gauge,
  },
];

const Page = observer(() => {
  const address = "Старокрымская ул, дом 15";

  return (
    <div className="space-y-3 px-3">
      <div className="rounded-2xl border flex gap-3 p-4 pt-3 mt-2">
        <Home className="mt-1" />
        <div>
          <h1 className="font-medium">Добрый день!</h1>
          <p className="text-muted-foreground text-sm">{address}</p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2">
        <Link
          to="/shop"
          className={cn(
            "size-full border-primary rounded-[20px] justify-between text-left flex flex-col border p-4 gap-4 bg-gray-100 font-medium",
          )}
        >
          <Zap />
          <p>Услуги за баллы</p>
        </Link>
        {cards.map((v, i) => (
          <li key={i} className="w-full">
            <button
              disabled
              className="size-full rounded-[20px] justify-between text-left flex flex-col border p-4 gap-4 bg-gray-100 font-medium"
            >
              <v.icon />
              <p>{v.title}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export const Route = createFileRoute("/_auth/")({
  component: Page,
});
