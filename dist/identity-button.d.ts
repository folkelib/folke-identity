import * as ko from 'knockout';
import * as menu from 'folke-menu';
import { UserViewModel } from './services';
export default class IdentityButtonViewModel {
    menu: menu.SubMenu;
    logged: ko.Computed<boolean>;
    account: ko.Observable<UserViewModel>;
    constructor(menu: menu.SubMenu);
    login: () => Promise<void>;
    toggle: () => ko.Observable<boolean>;
}
