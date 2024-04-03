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

  static async email_confirmation_attempt(
    request: Request,
    auth: Auth
  ): Promise<Result> {
    let { token_hash, type } = Object.fromEntries(
      new URL(request.url).searchParams
    );

    if (token_hash && type) {
      const { data, error } = await auth.verifyEmailToken(token_hash);

      if (error) {
        return new Result(false, error.message);
      }

      return new Result(true, data?.session);
    } else {
      return new Result(false, "Url is not complete");
    }
  }
}
// http://localhost:3300/auth/login#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6IjlMaU8rNUxPSDJabVNYcloiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEyMDk0NTM2LCJpYXQiOjE3MTIwOTA5MzYsImlzcyI6Imh0dHBzOi8vaW1mc2plbnhhaHN6bXB0YmJnZ2suc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjVmMzhhNTlmLTFkZTUtNGY4ZC04Mzc1LWVjYTViNGE4NzY3NSIsImVtYWlsIjoia2FycmVyam9uQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJrYXJyZXJqb25AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmMzhhNTlmLTFkZTUtNGY4ZC04Mzc1LWVjYTViNGE4NzY3NSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTcxMjA5MDkzNn1dLCJzZXNzaW9uX2lkIjoiN2U3ZWNhNTQtYTY3Yi00NGEyLThkMDgtOTgxNGIzMzg4MWI5IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.IwOp6eRCqed5TkWrcdPFlE5cTdPuQGw8O3Yv1hPvuXo&expires_at=1712094536&expires_in=3600&refresh_token=ncWySrh4g0fFLBBB9oD24w&token_type=bearer&type=signup
