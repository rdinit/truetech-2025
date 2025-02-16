import { CircleHelpIcon } from "lucide-react";
import { buttonVariants } from "./button";
import { cn } from "@/utils/cn";
import { PopoverContentProps } from "@radix-ui/react-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";

export const Hint = ({
  children,
  side,
  big = false,
  className,
}: {
  children: React.ReactNode;
  side?: PopoverContentProps["side"];
  big?: boolean;
  className?: string;
}) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger
          type="button"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "text-muted-foreground",
            !big && "min-w-6 size-6 rounded-full [&_svg]:size-4",
            className,
          )}
        >
          <CircleHelpIcon />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className="max-w-sm" side={side}>
            {children}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
};
