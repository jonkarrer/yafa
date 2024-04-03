import { Elysia } from "elysia";
import AuthController from "./controller/AuthController";
import Database from "./Database";

// Attempt Auth connection
let db = await Database.attemptConnection();

const Router = new Elysia()
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .decorate("auth", db)
  .get("/", ({ request, auth }) => Bun.file("public/index.html"))
  .get("/auth", () => AuthController.render_ui())
  .get("/auth/confirm_email", async ({ request, auth }) => {
    let check = await AuthController.email_confirmation_attempt(request, auth);
    console.log(check);
    if (check.success) {
      let headers = new Headers();
      const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
      headers.set(
        "Set-Cookie",
        `access_token=${check.message.access_token}; path=/; SameSite=Strict; HttpOnly; max-age=${maxAge}`
      );
      headers.set(
        "Set-Cookie",
        `refresh_token=${check.message.refresh_token}; path=/; SameSite=Strict; HttpOnly; max-age=${maxAge}`
      );
      headers.set("Location", "http://localhost:3300");
      return new Response(null, {
        status: 302,
        statusText: "Email confirmed",
        headers: headers,
      });
    } else {
      let headers = new Headers();
      headers.set("Location", "http://localhost:3300/auth");
      return new Response(null, {
        status: 302,
        statusText: "Email denied",
        headers: headers,
      });
    }
  })
  .post("/auth/login", ({ request, auth }) =>
    AuthController.login_user(request, auth)
  )
  .post("/auth/register", async ({ request, auth }) => {
    let register_attempt = await AuthController.register_user(request, auth);
    console.log(register_attempt);
    if (register_attempt.success) {
      return Response.redirect("./");
    } else {
      return Response.redirect(".");
    }
  });

export default Router;
