export interface AuthState {
  session: string | null;
  isAuthenticated: boolean;
}

export interface AuthError {
  code: string;
  message: string;
}