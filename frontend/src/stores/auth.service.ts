import { makeAutoObservable, when } from "mobx";
import { AuthEndpoint } from "@/api/endpoints/auth.endpoint";
import { AuthDto } from "@/api/models/auth.model";
import { HandleableError } from "@/utils/errors/handleable-error";
import { authToken } from "@/api/utils/auth-token";

export namespace Auth {
  export interface Authenticated {
    state: "authenticated";
    user: AuthDto.User;
  }

  export interface Anonymous {
    state: "anonymous";
  }

  export interface Loading {
    state: "loading";
  }

  export type State = Authenticated | Anonymous | Loading;
}

class AuthServiceFactory {
  public auth: Auth.State = { state: "loading" };

  constructor() {
    makeAutoObservable(this);
    void this.init();
  }

  private async init() {
    if (!authToken.get()) {
      this.auth = { state: "anonymous" };
      return;
    }

    try {
      this.auth = { state: "authenticated", user: {} };
      // const user = await AuthEndpoint.me().run();
    } catch (e) {
      if (e instanceof HandleableError) {
        e.handle();
      }
      this.auth = { state: "anonymous" };
    }
  }

  login = async (email: string, code: number): Promise<boolean> => {
    try {
      const token = await AuthEndpoint.submitOtp(email, code).run();
      authToken.set(token.token);

      const user = await AuthEndpoint.me().run();
      this.auth = { state: "authenticated", user };
      return true;
    } catch (e) {
      if (e instanceof HandleableError) e.handle();
      return false;
    }
  };

  waitInit() {
    return when(() => this.auth.state !== "loading");
  }

  logout() {
    this.auth = { state: "anonymous" };
    authToken.remove();
  }
}

export const AuthService = new AuthServiceFactory();
