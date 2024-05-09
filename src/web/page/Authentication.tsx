export default function Authentication() {
  return (
    <main>
      <h1>Login</h1>
      <form action="/auth/login" method="POST">
        <label>
          <p>Email</p>
          <input type="email" name="email" id="email_input" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" id="password_input" />
        </label>
        <button>Submit</button>
      </form>

      <h1>Register</h1>
      <form action="/auth/register" method="POST">
        <label>
          <p>Email</p>
          <input type="email" name="email" id="email_input" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" id="password_input" />
        </label>
        <button>Submit</button>
      </form>
    </main>
  );
}
