import Auth from "../../app/interface/auth";
import {
  AuthResponse,
  AuthTokenResponsePassword,
  createClient,
  SupabaseClient,
} from "@supabase/supabase-js";

class AuthGateway implements Auth {
  conn: SupabaseClient = createClient(
    "https://xyzcompany.supabase.co",
    "public-anon-key"
  );

  async register(email: string, password: string): Promise<AuthResponse> {
    return this.conn.auth.signUp({
      email: email,
      password: password,
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<AuthTokenResponsePassword> {
    return this.conn.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  async logout(): Promise<any> {
    // return this.conn.auth.signOut();
  }
}
