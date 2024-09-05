export enum Role {
  admin = "admin",
  user = "user",
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type AuthUserResponse = {
  token: string;
  user: AuthUser;
};
