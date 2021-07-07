import { RoleModel } from './role.model';

export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    roleId: number;
    email: string;
    active: string;
    activeDesc: string;
    role: string;
}
