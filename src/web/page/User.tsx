export default function User() {
  return (
    <main>
      <header>
        <nav>
          <form action="/user/logout" method="POST">
            <button type="submit">Logout</button>
          </form>
        </nav>
      </header>
      <h1>Hello User</h1>
    </main>
  );
}
