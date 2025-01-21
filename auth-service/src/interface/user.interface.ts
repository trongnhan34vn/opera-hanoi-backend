export interface UserSignUp extends UserSignIn {
  phone: string;
  firstName: string;
  lastName: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}
