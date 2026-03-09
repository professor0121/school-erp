export type UserRole =
  | "ADMIN"
  | "PRINCIPAL"
  | "TEACHER"
  | "ACCOUNTANT"
  | "LIBRARIAN"
  | "FEE_COLLECTOR"
  | "STUDENT"
  | "PARENT"
  | "STAFF";

export interface IUser {
  _id?: string;
  name: string;
  uniqueId: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}