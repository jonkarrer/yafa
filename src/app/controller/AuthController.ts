import Auth from "../interface/Auth";
import Authentication from "../../web/pages/Authentication";
import { YafaUser } from "../../domain/user";

export default class AuthController {
  static async render_ui(): Promise<JSX.Element> {
    return Authentication();
  }

  static async login_user(req: Request, auth: Auth): Promise<YafaUser> {
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

  static async register_user(req: Request, auth: Auth): Promise<YafaUser> {
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

  static async email_confirmation_attempt(
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
// http://localhost:3300/auth/login#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6IjlMaU8rNUxPSDJabVNYcloiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEyMDk0NTM2LCJpYXQiOjE3MTIwOTA5MzYsImlzcyI6Imh0dHBzOi8vaW1mc2plbnhhaHN6bXB0YmJnZ2suc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjVmMzhhNTlmLTFkZTUtNGY4ZC04Mzc1LWVjYTViNGE4NzY3NSIsImVtYWlsIjoia2FycmVyam9uQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWwiOiJrYXJyZXJqb25AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmMzhhNTlmLTFkZTUtNGY4ZC04Mzc1LWVjYTViNGE4NzY3NSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTcxMjA5MDkzNn1dLCJzZXNzaW9uX2lkIjoiN2U3ZWNhNTQtYTY3Yi00NGEyLThkMDgtOTgxNGIzMzg4MWI5IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.IwOp6eRCqed5TkWrcdPFlE5cTdPuQGw8O3Yv1hPvuXo&expires_at=1712094536&expires_in=3600&refresh_token=ncWySrh4g0fFLBBB9oD24w&token_type=bearer&type=signup
