import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Form } from "../ui/form";
import { Link } from "@tanstack/react-router";

const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "ФИО обязательно" }),
    address: z.string().min(1, { message: "Адрес обязателен" }),
    phone: z.string().min(1, { message: "Телефон обязателен" }),
    password: z
      .string()
      .min(8, { message: "Пароль должен быть не менее 8 символов" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Пароль должен быть не менее 8 символов" }),
    hasHealthConditions: z.boolean().optional().default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });
export type RegisterFormSchema = z.infer<typeof registerSchema>;

export const RegistrationForm = () => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = (data: RegisterFormSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col w-full max-w-lg m-auto"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Регистрация
          </CardTitle>
          <CardDescription className="text-center">
            Пожалуйста, заполните форму для создания аккаунта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field
            label="ФИО"
            control={form.control}
            name="fullName"
            component={(v) => (
              <Input placeholder="Иванов Иван Иванович" {...v} />
            )}
          />
          <Field
            label="Адрес и номер квартиры"
            control={form.control}
            name="address"
            component={(v) => (
              <Input placeholder="ул. Пушкина, д. 10, кв. 5" {...v} />
            )}
          />
          <Field
            label="Номер телефона"
            control={form.control}
            name="phone"
            component={(v) => <Input placeholder="+7 (999) 123-45-67" {...v} />}
          />
          <Field
            label="Пароль"
            control={form.control}
            name="password"
            component={(v) => (
              <Input type="password" placeholder="Пароль" {...v} />
            )}
          />
          <Field
            label="Подтвердите пароль"
            control={form.control}
            name="confirmPassword"
            component={(v) => (
              <Input type="password" placeholder="Подтвердите пароль" {...v} />
            )}
          />
          <Field
            label="У меня есть особенности по здоровью"
            hint="ОВЗ или МНТ"
            control={form.control}
            name="hasHealthConditions"
            inline
            component={({ value, onChange, ...x }) => (
              <Checkbox
                checked={value}
                onCheckedChange={(vv) => onChange(vv)}
                {...x}
              />
            )}
          />
        </CardContent>
        <CardFooter className="flex-col">
          <Button
            className="w-full"
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Войти
          </Button>
          <Link to="/login" className="underline text-primary py-2">
            У меня есть аккаунт
          </Link>
        </CardFooter>
      </form>
    </Form>
  );
};
