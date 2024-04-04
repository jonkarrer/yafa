import {
  Session,
  SupabaseClient,
  User,
  createClient,
} from "@supabase/supabase-js";
import Auth from "../app/interface/Auth";
import { YafaSession, YafaUser } from "../domain/user";

class Database implements Auth {
  public conn: SupabaseClient;

  constructor(conn: SupabaseClient) {
    this.conn = conn;
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

  private static transformIntoYafaUser(
    user: User,
    session: Session | null
  ): YafaUser {
    if (session) {
      let yafaSession: YafaSession = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
        expires_at: session.expires_at,
        token_type: session.token_type,
      };

      return {
        id: user.id,
        user_metadata: user.user_metadata,
        email: user.email,
        confirmed_at: user.confirmed_at,
        last_sign_in_at: user.last_sign_in_at,
        role: user.role,
        updated_at: user.updated_at,
        created_at: user.created_at,
        session: yafaSession,
      };
    }

    return {
      id: user.id,
      user_metadata: user.user_metadata,
      email: user.email,
      confirmed_at: user.confirmed_at,
      last_sign_in_at: user.last_sign_in_at,
      role: user.role,
      updated_at: user.updated_at,
      created_at: user.created_at,
      session: undefined,
    };
  }

  async register(email: string, password: string): Promise<YafaUser> {
    let { data, error } = await this.conn.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:3300/auth/login",
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User not returned");
    return Database.transformIntoYafaUser(data.user, data.session);
  }

  async login(email: string, password: string): Promise<YafaUser> {
    let { data, error } = await this.conn.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User not returned");
    if (!data.session) throw new Error("Session not returned");
    return Database.transformIntoYafaUser(data.user, data.session);
  }

  async getCurrentUser(jwt_token: string): Promise<YafaUser> {
    let { data, error } = await this.conn.auth.getUser(jwt_token);

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User not returned");
    return Database.transformIntoYafaUser(data.user, null);
  }

  async verifyEmailToken(token: string): Promise<YafaUser> {
    let { data, error } = await this.conn.auth.verifyOtp({
      token_hash: token,
      type: "email",
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("User not returned");
    if (!data.session) throw new Error("Session not returned");
    return Database.transformIntoYafaUser(data.user, data.session);
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
}

export default Database;
