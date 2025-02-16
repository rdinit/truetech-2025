import { z } from "zod";
import { ModalFC } from "../ui/modal/types";
import { UkRequestItem, UkRequestTemplate } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, Form } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Введите значение"),
  description: z.string().trim().min(1, "Введите значение"),
});

export const UkRequestModal: ModalFC<
  { item: UkRequestItem | null },
  UkRequestItem
> = (x) => {
  const form = useForm<UkRequestTemplate>({
    resolver: zodResolver(formSchema),
    defaultValues: x.item ?? {
      name: "",
      description: "",
    },
  });

  const onSubmit = async () => {
    if (x.item) {
      // update
    } else {
      //create
    }

    await new Promise((r) => setTimeout(() => {}, 1500));

    toast.success("Заявка создана!", {
      description: "Мы свяжемся с вами в скором времени",
    });
    x.done(undefined);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Обращение в управляющую компанию</DialogTitle>
        <DialogDescription>
          Все заявки проходят модерацию и поступают от имени того, кто оставил
          обращение
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
          <Field
            control={form.control}
            name="name"
            label="Что произошло?"
            component={(x) => (
              <Input {...x} placeholder="Нарушение доступности во дворе" />
            )}
          />
          <Field
            control={form.control}
            name="description"
            label="Опишите подробнее"
            component={(x) => (
              <Textarea
                {...x}
                className="min-h-20"
                placeholder="Во двор около пятого подъезда нельзя въехать на коляске со стороны парковки"
              />
            )}
          />
          <DialogFooter>
            <Button
              type="button"
              onClick={() => x.done(undefined)}
              variant="outline"
            >
              Отмена
            </Button>
            <Button loading={form.formState.isSubmitting}>Отправить</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
