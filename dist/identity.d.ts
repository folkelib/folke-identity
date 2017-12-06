/// <reference types="knockout" />
import { Application, Route } from 'folke-core';
import { Services, User } from './services';
import { Menu } from 'folke-menu';
export interface Identity<TKey> {
    app: Application;
    services: Services<TKey>;
    menu?: Menu;
    hideEmailConfirmBar(hide: boolean): void;
    account: KnockoutObservable<User<TKey>>;
    logged: KnockoutObservable<boolean>;
    loading: () => boolean;
    goToLogin(onLogin: () => void): void;
    addLoggedRoute<T>(route: Route<T>): void;
    addRoleRoute<T>(route: Route<T>, role: string): void;
    updateMe(): Promise<User<TKey>>;
}
