import { Role } from "../types/role.type";

export interface ClientRequest {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
  motherSurname: string;
  fatherSurname: string;
  roles: Role[];
}
