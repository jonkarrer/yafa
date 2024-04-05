import { YafaUser } from "../../domain/user";

export default interface Auth {
  register(email: string, password: string): Promise<YafaUser>;
  login(email: string, password: string): Promise<YafaUser>;
  getCurrentUser(jwt_token: string): Promise<YafaUser>;
  verifyEmailToken(token: string): Promise<YafaUser>;
  refreshSession(refresh_token: string): Promise<YafaUser>;
  logout(): Promise<any>;
  resetPassword<T>(email: string): Promise<T>;
  updateUserPassword<T>(new_password: string): Promise<T>;
  updateUserEmail<T>(new_email: string): Promise<T>;
}
