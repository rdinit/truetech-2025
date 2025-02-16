import { z } from "zod";
import { ModalFC } from "../ui/modal/types";
import { ReportIssueItem, ReportIssueTemplate } from "./types";
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
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().trim().min(1, "Введите значение"),
  description: z.string().trim().min(1, "Введите значение"),
});

export const ReportIssueModal: ModalFC<
  { item: ReportIssueItem | null },
  ReportIssueItem
> = (x) => {
  const form = useForm<ReportIssueTemplate>({
    resolver: zodResolver(formSchema),
    defaultValues: x.item ?? {
      name: "",
      description: "",
    },
  });
  const [_, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    if (x.item) {
      // update
    } else {
      //create
    }

    await new Promise((r) => setTimeout(r, 1500));

    toast.success("Заявка отправлена на модерацию!");
    x.done(undefined);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Сообщение об аварии</DialogTitle>
        <DialogDescription>
          Все заявки проходят модерацию и поступают от имени того, кто сообщил о
          аварийной ситуации. Убедитесь, что вы действительно уверены в том, что
          тревога не ложная
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
            name="proof-image"
            label="Фото аварии"
            component={(x) => (
              <Input
                id="proof-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            )}
          />
          {imagePreview && (
            <div>
              <img
                src={imagePreview}
                alt="Image preview"
                width={200}
                height={200}
                className="object-contain border w-fit rounded-md max-h-60"
              />
            </div>
          )}
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
