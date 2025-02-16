import { z } from "zod";

export namespace CommonForm {
  export const required = () =>
    z
      .string({
        required_error: "Обязательное поле",
      })
      .trim()
      .min(1, "Обязательное поле");

  export const email = () =>
    required().email("Неправильная почта");

  export const url = () => required().url("Ссылка неверного формата");
}
