import Auth from "../../app/interface/Auth";
import Result from "../../domain/result";
import Authentication from "../../web/pages/Authentication";

export default class AuthController {
  static async render_ui(): Promise<JSX.Element> {
    return Authentication();
  }

  static async login_user(req: Request, auth: Auth): Promise<Result> {
    let form_data = await req.formData();

    if (form_data) {
      let email = form_data.get("email");
      let password = form_data.get("password");

      if (email && password) {
        try {
          let a = await auth.login(email.toString(), password.toString());
          return new Result(true, a);
        } catch (e) {
          return new Result(false, e);
        }
      } else {
        return new Result(false, "Missing email or password");
      }
    } else {
      return new Result(false, "Missing form data");
    }
  }

  static async register_user(req: Request, auth: Auth): Promise<Result> {
    let form_data = await req.formData();

    if (form_data) {
      let email = form_data.get("email");
      let password = form_data.get("password");

      if (email && password) {
        try {
          let a = await auth.register(email.toString(), password.toString());
          return new Result(true, a);
        } catch (e) {
          return new Result(false, e);
        }
      } else {
        return new Result(false, "Missing email or password");
      }
    } else {
      return new Result(false, "Missing form data");
    }
  }

  static user_is_from_email_confirmation_link(request: Request): Result {
    let params = new URL(request.url).searchParams;
    let token = params.get("token");

    if (token) {
      return new Result(true, token);
    } else {
      return new Result(false, "No token in url");
    }
  }
}
