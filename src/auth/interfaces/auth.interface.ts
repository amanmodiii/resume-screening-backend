// email validation to be done later

type Email = string;

type collegeEmail = Email & string;

export interface LoginUser {
  email: Email | collegeEmail;
  password: string;
}

export interface RegisterRecruiter {
  name: string;
  email: Email;
  password: string;
  companyName: string;
  url?: string;
  designation: string;
  industry: string;
}

export interface RegisterApplicant {
  name: string;
  email: collegeEmail;
  password: string;
  bio?: string;
  portfolioUrl?: string;
}
