import { Dock, DockIcon } from "../magicui/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/cn";
import { buttonVariants } from "../ui/button";
import { FC, SVGProps, useState } from "react";
import {
  Blocks,
  Bot,
  MessageSquareWarning,
  Newspaper,
  User,
  Zap,
} from "lucide-react";
import { Separator } from "../ui/separator";

export interface NavigationItem {
  href: string;
  label: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

const items: NavigationItem[] = [
  {
    href: "/",
    icon: Blocks,
    label: "Услуги",
  },
  {
    href: "/services",
    icon: MessageSquareWarning,
    label: "Обращения",
  },
  {
    href: "/chat",
    icon: Bot,
    label: "Голосовой помощник",
  },
  {
    href: "/map",
    icon: Newspaper,
    label: "Места",
  },
  {
    href: "/profile",
    icon: User,
    label: "Личный кабинет",
  },
];

export const Navigation = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="min-h-[84px]"></div>
      <Dock className="fixed bottom-4 left-1/2 -translate-x-1/2">
        {items.map((item, i) => (
          <DockIcon key={item.href}>
            <Tooltip open={i === active}>
              <TooltipTrigger
                asChild
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 min-w-12 rounded-full",
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        <div className="items-center gap-1.5 flex font-medium px-1 pr-3 text-primary">
          <Zap className="size-4" />
          <span className="sr-only">Количество бонусов</span>
          400
        </div>
      </Dock>
    </>
  );
};
