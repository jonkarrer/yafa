export default interface Auth {
  register(email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
}
