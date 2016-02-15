import application from "../folke-core/folke";
import authentication from './authentication';
import menu from '../folke-menu/menu';
import * as ko from 'knockout';

export function register(basePath:string) {
    application.registerComponent(basePath, 'identity-email');
    application.registerComponent(basePath, 'identity-forgot');
    application.registerComponent(basePath, 'identity-login');
    application.registerComponent(basePath, 'identity-password');
    application.registerComponent(basePath, 'identity-register');
    application.registerComponent(basePath, 'identity-reset');
}

export function registerAdministration(basePath: string, role: string) {
    application.registerComponent(basePath, 'identity-users');
    authentication.addRoleRoute('users', role, 'identity-users');
    application.registerComponent(basePath, 'identity-user');
    authentication.addRoleRoute('user/{id}', role, 'identity-user');
    application.registerComponent(basePath, 'identity-roles');
    authentication.addRoleRoute('roles', role, 'identity-roles');
}

export function registerMenu(basePath: string) {
    application.registerComponent(basePath, 'identity-button');
    var subMenu = menu.addCustomSubMenu('identity-button');
    subMenu.addButton(ko.observable('Se déconnecter'), () => authentication.logout());
}

export function registerAdministrationMenu(role: string) {
    var subMenu = menu.addSubMenu(ko.observable('Administration'), 1, ko.computed(() => authentication.hasRole(role)));
    subMenu.addRouteButton(ko.observable('Utilisateurs'), 'users');
    subMenu.addRouteButton(ko.observable('Rôles'), 'roles');
}

export default register;