export type YafaUserMetadata = {
  [key: string]: any;
};

export type YafaSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
};

export type YafaUser = {
  id: string;
  user_metadata: YafaUserMetadata;
  email?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  created_at: string;
  session?: YafaSession;
};
