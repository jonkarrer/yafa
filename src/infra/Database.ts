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
  async register(email: string, password: string): Promise<User> {
    let { data, error } = await this.conn.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:3300/auth/login",
      },
    });

    if (error) {
      throw error.message;
    }

    if (data.user) {
      return data.user;
    } else {
      throw "Session data is missing";
    }
  }

  async login(email: string, password: string): Promise<string> {
    let { data, error } = await this.conn.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error.message;
    }

    if (data.session) {
      return data.session.access_token;
    } else {
      throw "Access token is missing";
    }
  }

  async logout(): Promise<any> {
    return this.conn.auth.signOut();
  }

  async resetPassword(email: string): Promise<any> {
    return this.conn.auth.resetPasswordForEmail(email, {
      redirectTo: "https://example.com/update-password",
    });
  }

  async updateUserPassword(new_password: string): Promise<any> {
    return this.conn.auth.updateUser({
      password: new_password,
    });
  }

  updateUserEmail(new_email: string): Promise<any> {
    return this.conn.auth.updateUser({
      email: new_email,
    });
  }

  getCurrentUser(jwt_token: string): Promise<any> {
    return this.conn.auth.getUser(jwt_token);
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

  verifyEmailToken(token: string): Promise<AuthResponse> {
    return this.conn.auth.verifyOtp({ token_hash: token, type: "email" });
  }
}

export default Database;
