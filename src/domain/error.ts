export interface Err {
  sendResponse(): Response;
}

export class Unauthorized extends Error implements Err {
  constructor(public message: string) {
    super(message);
  }

  sendResponse(): Response {
    let headers = new Headers();
    headers.set("Location", "http://localhost:3300/auth");
    return new Response(null, {
      status: 302,
      statusText: this.message,
      headers: headers,
    });
  }
}
