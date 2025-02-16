import { TooltipProps, TooltipTriggerProps } from "@radix-ui/react-tooltip";
import { useState } from "react";

export const useMobileTooltip = (): {
  tooltipProps: TooltipProps;
  tooltipTriggerProps: TooltipTriggerProps;
} => {
  const [open, setOpen] = useState(false);

  return {
    tooltipProps: { open },
    tooltipTriggerProps: {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      onFocus: () => setOpen(true),
      onBlur: () => setOpen(false),
    },
  };
};
