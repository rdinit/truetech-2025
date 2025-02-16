import { AuthDto } from "../models/auth.model";
import { api } from "../utils/api";

export namespace AuthEndpoint {
  export const me = () => api("/check_token").get.expectSchema(AuthDto.User);

  export const signIn = (email: string) =>
    api("/sign_in").post.withBody({ email }).expectSchema(AuthDto.Token);

  export const submitOtp = (email: string, code: number) =>
    api("/confirm_sign_in")
      .post.withBody({
        email,
        code,
      })
      .expectSchema(AuthDto.Token);
}
