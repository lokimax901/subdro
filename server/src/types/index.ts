import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'user';
  created_at: string;
  subscription_status?: 'active' | 'inactive' | 'pending' | 'canceled';
  subscription_type?: string;
  subscription_end_date?: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  subscription_status?: 'active' | 'inactive' | 'pending' | 'canceled';
  subscription_type?: string;
  subscription_end_date?: string;
} 