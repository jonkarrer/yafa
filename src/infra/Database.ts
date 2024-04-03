import {
  AuthResponse,
  AuthTokenResponsePassword,
  EmailOtpType,
  MobileOtpType,
  Session,
  SupabaseClient,
  User,
  createClient,
} from "@supabase/supabase-js";
import Auth from "../app/interface/Auth";

class Database implements Auth {
  public conn: SupabaseClient;

  constructor(conn: SupabaseClient) {
    this.conn = conn;
  }
  async register<T>(email: string, password: string): Promise<T> {
    return this.conn.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:3300/auth/login",
      },
    }) as T;
  }

  async login<T>(email: string, password: string): Promise<T> {
    return this.conn.auth.signInWithPassword({
      email: email,
      password: password,
    }) as T;
  }

  async logout(): Promise<any> {
    return this.conn.auth.signOut();
  }

  async resetPassword<T>(email: string): Promise<T> {
    return this.conn.auth.resetPasswordForEmail(email, {
      redirectTo: "https://example.com/update-password",
    }) as T;
  }

  async updateUserPassword<T>(new_password: string): Promise<T> {
    return this.conn.auth.updateUser({
      password: new_password,
    }) as T;
  }

  async updateUserEmail<T>(new_email: string): Promise<T> {
    return this.conn.auth.updateUser({
      email: new_email,
    }) as T;
  }

  async getCurrentUser<T>(jwt_token: string): Promise<T> {
    return this.conn.auth.getUser(jwt_token) as T;
  }

  static async attemptConnection(): Promise<Database> {
    let url = Bun.env.DATABASE_URL;
    let key = Bun.env.DATABASE_PUBLIC_ANON_KEY;

    if (url && key) {
      try {
        let s = await createClient(url, key);
        return new Database(s);
      } catch (e) {
        throw e;
      }
    } else {
      throw "Can't connect to db: Invalid url or Key";
    }
  }

  async verifyEmailToken<T>(token: string): Promise<T> {
    return this.conn.auth.verifyOtp({ token_hash: token, type: "email" }) as T;
  }
}

export default Database;
