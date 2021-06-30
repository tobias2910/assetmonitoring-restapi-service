/**
 * 
 */
class Roles {
    private roles: string [];
    private roleRights: Map <string, string[]>;

    constructor() {
        this.roles = ['user', 'admin'];
        this.initRoleRights();
    }

    public getRoles (): string [] {
        return this.roles;
    }

    public getRoleRights (): Map <string, string[]> {
        return this.roleRights;
    }

    private initRoleRights(): void {
        this.roleRights = new Map();
        this.roleRights.set(this.roles[0], []);
        this.roleRights.set(this.roles[1], ['getUsers', 'manageUsers']);
    }
}

export default new Roles();