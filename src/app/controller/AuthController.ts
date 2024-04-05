import Auth from "../interface/Auth";
import Authentication from "../../web/pages/Authentication";
import { YafaUser } from "../../domain/user";
import { Unauthorized } from "../../domain/error";

export default class AuthController {
  static async render_ui(): Promise<JSX.Element> {
    return Authentication();
  }

  static async loginUser(req: Request, auth: Auth): Promise<YafaUser> {
    let form_data = await req.formData();

    if (form_data) {
      let email = form_data.get("email");
      let password = form_data.get("password");

      if (email && password) {
        try {
          return auth.login(email.toString(), password.toString());
        } catch (e) {
          throw e;
        }
      } else {
        throw new Error("Missing email or password");
      }
    } else {
      throw new Error("Missing form data");
    }
  }

  static async registerUser(req: Request, auth: Auth): Promise<YafaUser> {
    let form_data = await req.formData();

    if (form_data) {
      let email = form_data.get("email");
      let password = form_data.get("password");

      if (email && password) {
        try {
          return auth.register(email.toString(), password.toString());
        } catch (e) {
          throw e;
        }
      } else {
        throw new Error("Missing email or password");
      }
    } else {
      throw new Error("Missing form data");
    }
  }

  static async validateSession(
    access_token: string,
    refresh_token: string,
    auth: Auth
  ): Promise<YafaUser> {
    try {
      let user = await auth.getCurrentUser(access_token);
      return user;
    } catch {
      try {
        let user = await auth.refreshSession(refresh_token);

        if (user.session) {
          return user;
        } else {
          let message = "Access denied refresh token invalid";
          throw new Error(message);
        }
      } catch {
        let message = "Access denied failed auth";
        throw new Error(message);
      }
    }
  }

  static async emailConfirmationAttempt(
    request: Request,
    auth: Auth
  ): Promise<YafaUser> {
    let { token_hash, type } = Object.fromEntries(
      new URL(request.url).searchParams
    );

    if (token_hash && type) {
      return auth.verifyEmailToken(token_hash);
    } else {
      throw new Error("Url is not complete");
    }
  }
}
