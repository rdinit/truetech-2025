import { observer } from "mobx-react-lite";
import { ModalFC } from "../ui/modal/types";
import { Button } from "../ui/button";
import { useAction } from "@/utils/hooks/use-action";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ReactNode } from "react";
import { useModalBusy } from "../ui/modal/modal.context";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  action: () => Promise<unknown>;
  title: string;
  description?: string | ReactNode;
  destructive?: boolean;
  buttonText?: string;
}

export const ConfirmationModalWithDelete =
  (
    slot: {
      nominative: string;
      genitive: string;
    },
    action: ConfirmationModalProps["action"],
  ): ModalFC<Partial<ConfirmationModalProps>, boolean> =>
  (x) => (
    <ConfirmationModal
      action={action}
      title={`Удаление ${slot.genitive}`}
      description={`Вы уверены, что хотите удалить ${slot.nominative}?`}
      buttonText="Удалить"
      destructive
      {...x}
    />
  );

export const ConfirmationModal: ModalFC<ConfirmationModalProps, boolean> =
  observer((x) => {
    const { t } = useTranslation("common");
    const [action, { isLoading }] = useAction(async () => {
      await x.action();
      return x.done(true);
    });

    useModalBusy(isLoading);

    return (
      <>
        <DialogHeader>
          <DialogTitle>{x.title}</DialogTitle>
          {x.description && (
            <DialogDescription>{x.description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => x.done(false)}
            disabled={isLoading}
          >
            {t("COMMON.FORM.BUTTONS.CANCEL")}
          </Button>
          <Button
            variant={x.destructive ? "destructive" : "default"}
            onClick={action}
            loading={isLoading}
            disabled={isLoading}
          >
            {x.buttonText ?? t("COMMON.FORM.BUTTONS.OK")}
          </Button>
        </DialogFooter>
      </>
    );
  });
