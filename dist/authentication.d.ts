/// <reference types="knockout" />
import { User } from './services';
export declare class Authentication {
    account: KnockoutObservable<User>;
    hideEmailConfirmBar: KnockoutObservable<boolean>;
    roles: KnockoutObservableArray<string>;
    rolesLoaded: KnockoutObservable<boolean>;
    accountLoaded: KnockoutComputed<User>;
    logged: KnockoutComputed<boolean>;
    updateMe(): Promise<User>;
    logout: () => Promise<{}>;
    getLogged(): Promise<boolean>;
    updateRoles(): Promise<string[]>;
    roleObservable(roleName: string): KnockoutComputed<boolean>;
    hasRole(roleName: string): boolean;
    whenHasRole(roleName: string): Promise<boolean>;
    whenLogged(): Promise<boolean>;
    addLoggedRoute(route: string, viewId: string): void;
    addRoleRoute(route: string, role: string, viewId: string): void;
    message(message: string): void;
}
declare var _default: Authentication;
export default _default;
