import * as ko from 'knockout';
import authentication from './authentication';
import * as menu from 'folke-menu';
import folke from 'folke-core';
import { UserViewModel } from './services';

export default class IdentityButtonViewModel {
    public logged = authentication.logged;
    public account = authentication.account;

    constructor(public menu: menu.SubMenu) {
    }

    public login = () => folke.showPopin('identity-login').then(() => folke.hidePopin());
    public toggle = () => this.menu.collapsed(!this.menu.collapsed());
}
