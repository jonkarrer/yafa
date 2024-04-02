export default function Authentication() {
  function submitForm() {
    console.log("form submitted");
  }
  return (
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
  );
}
