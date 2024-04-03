export default interface Auth {
  register(email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  resetPassword(email: string): Promise<any>;
  updateUserPassword(new_password: string): Promise<any>;
  updateUserEmail(new_email: string): Promise<any>;
  getCurrentUser(jwt_token: string): Promise<any>;
  verifyEmailToken(token: string): Promise<any>;
}
