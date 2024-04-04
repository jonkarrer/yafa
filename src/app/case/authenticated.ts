export function authenticated(
  access_token: string,
  refresh_token: string
): Response {
  let headers = new Headers();
  const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
  headers.append(
    "Set-Cookie",
    `access_token=${access_token}; path=/; SameSite=Strict; HttpOnly; max-age=${maxAge}`
  );
  headers.append(
    "Set-Cookie",
    `refresh_token=${refresh_token}; path=/; SameSite=Strict; HttpOnly; max-age=${maxAge}`
  );
  headers.set("Location", "http://localhost:3300");
  return new Response(null, {
    status: 302,
    statusText: "Email confirmed",
    headers: headers,
  });
}

export function unauthenticated(message: string): Response {
  let headers = new Headers();
  headers.set("Location", "http://localhost:3300/auth");
  return new Response(null, {
    status: 302,
    statusText: message,
    headers: headers,
  });
}

export function registered(welcome_page_path: string): Response {
  return Response.redirect(welcome_page_path);
}
