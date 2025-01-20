export interface UserSignUp extends UserSignIn {
  phone: string;
  fullName: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}
