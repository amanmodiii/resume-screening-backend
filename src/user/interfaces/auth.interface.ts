// email validation to be done later

type Email = string;

type collegeEmail = Email & string;

export interface LoginUser {
  email: Email | collegeEmail;
  password: string;
}

export type UserRole = 'ADMIN' | 'USER';

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  bio?: string;
  portfolioUrl?: string;
}
