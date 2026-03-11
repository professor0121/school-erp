export type UserRole =
  | "ADMIN"
  | "PRINCIPAL"
  | "TEACHER"
  | "ACCOUNTANT"
  | "LIBRARIAN"
  | "FEE_COLLECTOR"
  | "STUDENT"
  | "PARENT"
  | "HR"
  | "STAFF";

export interface IUser {
  _id?: string;
  name: string;
  uniqueId: string;
  email: string;
  password: string;
  role: UserRole;
  profileId: Object
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}