export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'FREE' | 'PRO';
  status: 'ACTIVE' | 'BLOCKED';
  created_at: string;
  updated_at: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    plan: string;
  };
}
