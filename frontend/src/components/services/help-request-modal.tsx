import { z } from "zod";
import { ModalFC } from "../ui/modal/types";
import { HelpRequestItem, HelpRequestTemplate } from "./types";
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
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Введите значение"),
  description: z.string().trim().min(1, "Введите значение"),
  location: z.string().trim().min(1, "Введите значение"),
  time: z.string().trim().min(1, "Введите значение"),
});

export const HelpRequestModal: ModalFC<
  { item: HelpRequestItem | null },
  HelpRequestItem
> = (x) => {
  const form = useForm<HelpRequestTemplate>({
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
        <DialogTitle>Просьба о помощи</DialogTitle>
        <DialogDescription>
          К вам на помощь придёт один из желающих
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
          <Field
            control={form.control}
            name="name"
            label="Что произошло?"
            component={(x) => <Input {...x} placeholder="Сломался лифт" />}
          />
          <Field
            control={form.control}
            name="description"
            label="Опишите подробнее"
            component={(x) => (
              <Input {...x} placeholder="4 лифт. Не работает с самого утра" />
            )}
          />
          <Field
            control={form.control}
            name="description"
            label="Место, где нужна помощь"
            component={(x) => <Input {...x} placeholder="4 подъезд" />}
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
