"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
class Roles {
    constructor() {
        this.roles = ['user', 'admin'];
        this.initRoleRights();
    }
    getRoles() {
        return this.roles;
    }
    getRoleRights() {
        return this.roleRights;
    }
    initRoleRights() {
        this.roleRights = new Map();
        this.roleRights.set(this.roles[0], []);
        this.roleRights.set(this.roles[1], ['getUsers', 'manageUsers']);
    }
}
exports.default = new Roles();
//# sourceMappingURL=roles.js.map