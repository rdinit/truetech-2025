import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Form } from "../ui/form";
import { Link } from "@tanstack/react-router";

const loginSchema = z.object({
  phone: z.string().min(1, { message: "Телефон обязателен" }),
  password: z.string(),
  // .min(8, { message: "Пароль должен быть не менее 8 символов" }),
});
export type LoginFormSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = (data: LoginFormSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col w-full max-w-lg m-auto"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Вход</CardTitle>
          <CardDescription className="text-center">
            Пожалуйста, введите телефон и пароль
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
        <CardFooter className="flex-col">
          <Button
            className="w-full"
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Войти
          </Button>
          <Link to="/register" className="underline text-primary py-2">
            У меня нет аккаунта
          </Link>
        </CardFooter>
      </form>
    </Form>
  );
};
