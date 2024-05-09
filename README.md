# YAFA

A tool for rendering quick fundamental analysis dashboards

## Test

### Confirm email link

http://localhost:3300/auth/confirm_email?token_hash=26010e3719cc489634ac5fdf3eab3b7a30d0e1475b758162b388cf56&type=email&redirect_to=http%3a%2f%2flocalhost%3a3300%2fauth%2flogin

## User Auth

- sessions are stored in a cookie. refresh_token and access_token.
- middleware looks for these and tries to verify the session
- In case of not authed, throws an exception and routes back to login.
- To logout, we just clear these cookies.
