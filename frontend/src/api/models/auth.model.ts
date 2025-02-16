import { z } from "zod";

export namespace AuthDto {
  export const Token = z.object({
    token: z.string(),
    status: z.string(),
  });
  export type Token = z.infer<typeof Token>;

  export const User = z.object({});
  export type User = z.infer<typeof User>;
}
