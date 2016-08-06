import { User } from './services';
import ko = require('knockout');
export declare class Authentication {
    account: ko.Observable<User>;
    hideEmailConfirmBar: ko.Observable<boolean>;
    roles: ko.ObservableArray<string>;
    rolesLoaded: ko.Observable<boolean>;
    accountLoaded: ko.PureComputed<User>;
    logged: ko.Computed<boolean>;
    updateMe(): Promise<User>;
    logout: () => Promise<User>;
    getLogged(): Promise<boolean>;
    updateRoles(): Promise<string[]>;
    roleObservable(roleName: string): ko.PureComputed<boolean>;
    hasRole(roleName: string): boolean;
    whenHasRole(roleName: string): Promise<boolean>;
    whenLogged(): Promise<User>;
    addLoggedRoute(route: string, viewId: string): void;
    addRoleRoute(route: string, role: string, viewId: string): void;
    message(message: string): void;
}
declare var _default: Authentication;
export default _default;
