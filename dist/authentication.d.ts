import { UserViewModel } from './services';
import ko = require('knockout');
export declare class Authentication {
    account: ko.Observable<UserViewModel>;
    hideEmailConfirmBar: ko.Observable<boolean>;
    roles: ko.ObservableArray<string>;
    constructor();
    rolesLoaded: ko.Observable<boolean>;
    accountLoaded: ko.PureComputed<UserViewModel>;
    logged: ko.Computed<boolean>;
    updateMe(): Promise<UserViewModel>;
    logout: () => Promise<UserViewModel>;
    getLogged(): Promise<boolean>;
    updateRoles(): Promise<string[]>;
    roleObservable(roleName: string): ko.PureComputed<boolean>;
    hasRole(roleName: string): boolean;
    whenHasRole(roleName: string): Promise<boolean>;
    whenLogged(): Promise<UserViewModel>;
    addLoggedRoute(route: string, viewId: string): void;
    addRoleRoute(route: string, role: string, viewId: string): void;
    message(message: string): void;
}
declare var _default: Authentication;
export default _default;
