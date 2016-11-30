/// <reference types="knockout" />
import * as menu from 'folke-menu';
import { User } from './services';
export default class IdentityButtonViewModel {
    menu: menu.SubMenu;
    logged: KnockoutComputed<boolean>;
    account: KnockoutObservable<User>;
    constructor(menu: menu.SubMenu);
    login: () => PromiseLike<void>;
    toggle: () => void;
}
