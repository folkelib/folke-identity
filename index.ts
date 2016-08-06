import application from "folke-core";
import authentication from './authentication';
import menu from 'folke-menu';
import * as ko from 'knockout';
import * as koPromise from 'folke-ko-promise';
import { register as registerServices, Services } from './services';

import email from './identity-email';
import forgot from './identity-forgot';
import password from './identity-password';
import login from './identity-login';
import register from './identity-register';
import reset from './identity-reset';
import users from './identity-users';
import user from './identity-user';
import roles from './identity-roles';
import button from './identity-button';

export {fr} from './fr';

declare function require(id:string):string;

function registerComponent<T>(name:string, viewModel: T){
    ko.components.register(name, {
        template: require(`./${name}.html`),
        viewModel: viewModel
    })
}

export function register(services: Services, role: string) {
    registerBase(services);
    authentication.updateMe();
    registerAdministration(role);
    registerMenu();
    registerAdministrationMenu(role);
}

export function registerBase(services: Services) {
    registerServices(services);
    koPromise.register();
    registerComponent('identity-email', email);
    registerComponent('identity-forgot', forgot);
    registerComponent('identity-password', password);
    registerComponent('identity-login', login);
    registerComponent('identity-register', register);
    registerComponent('identity-reset', reset);
}

export function registerAdministration(role: string) {
    registerComponent('identity-users', users);
    authentication.addRoleRoute('users', role, 'identity-users');
    registerComponent('identity-user', user);
    authentication.addRoleRoute('user/{id}', role, 'identity-user');
    registerComponent('identity-roles', roles);
    authentication.addRoleRoute('roles', role, 'identity-roles');
}

export function registerMenu() {
    registerComponent('identity-button', button);
    var subMenu = menu.addCustomSubMenu('identity-button');
    subMenu.addButton(ko.observable('Se déconnecter'), () => authentication.logout());
}

export function registerAdministrationMenu(role: string) {
    var subMenu = menu.addSubMenu(ko.observable('Administration'), 1, ko.computed(() => authentication.hasRole(role)));
    subMenu.addRouteButton(ko.observable('Utilisateurs'), 'users');
    subMenu.addRouteButton(ko.observable('Rôles'), 'roles');
}

export default register;