import { Role } from './Role';

export class User {
    public userGuid: string;
    public username: string;
    public surname: string;
    public givenName: string;
    public password: string;
    public lastLogin: string;
    public loginCount: number;
    public theme: string;
    public picture: string;
    public roles: Role[];
    public status: string;
    public createdOn: number;
    public createdBy: string;
    public updatedOn: number;
    public updatedBy: string;
}
