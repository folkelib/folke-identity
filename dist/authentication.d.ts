/// <reference types="knockout" />
import { Services, User } from './services';
import { Application, Route } from 'folke-core';
import { Identity } from './identity';
import { Menu } from 'folke-menu';
export declare class Authentication<TKey> implements Identity<TKey> {
    app: Application;
    services: Services<TKey>;
    loading: () => boolean;
    menu: Menu | undefined;
    constructor(app: Application, services: Services<TKey>, loading: () => boolean, menu?: Menu | undefined);
    account: KnockoutObservable<User<TKey>>;
    hideEmailConfirmBar: KnockoutObservable<boolean>;
    roles: KnockoutObservableArray<string>;
    rolesLoaded: KnockoutObservable<boolean>;
    accountLoaded: KnockoutComputed<User<TKey>>;
    logged: KnockoutComputed<boolean>;
    updateMe(): Promise<User<TKey>>;
    logout: () => Promise<User<TKey>>;
    getLogged(): Promise<boolean>;
    updateRoles(): Promise<string[]>;
    roleObservable(roleName: string): KnockoutComputed<boolean>;
    hasRole(roleName: string): boolean;
    whenHasRole(roleName: string): Promise<boolean>;
    whenLogged(): Promise<{}>;
    goToLogin(onLogin: () => void): void;
    addLoggedRoute<T>(route: Route<T>): void;
    addRoleRoute<T>(route: Route<T>, role: string): void;
    message(message: string): void;
    register(adminRole: string): void;
    registerAdministration(role: string): void;
    registerMenu(): void;
    registerAdministrationMenu(role: string): void;
}
