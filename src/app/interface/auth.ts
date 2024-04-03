export default interface Auth {
  register<T>(email: string, password: string): Promise<T>;
  login<T>(email: string, password: string): Promise<T>;
  logout(): Promise<any>;
  resetPassword<T>(email: string): Promise<T>;
  updateUserPassword<T>(new_password: string): Promise<T>;
  updateUserEmail<T>(new_email: string): Promise<T>;
  getCurrentUser<T>(jwt_token: string): Promise<T>;
  verifyEmailToken<T>(token: string): Promise<T>;
}
