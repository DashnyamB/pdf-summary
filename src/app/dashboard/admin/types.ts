export type UserRole = "admin" | "member";

export type UserStatus = "active" | "invited" | "disabled";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};
