"use strict";
var authentication_1 = require('./authentication');
var folke_menu_1 = require('folke-menu');
var ko = require('knockout');
var koPromise = require('folke-ko-promise');
var identity_email_1 = require('./identity-email');
var identity_forgot_1 = require('./identity-forgot');
var identity_password_1 = require('./identity-password');
var identity_login_1 = require('./identity-login');
var identity_register_1 = require('./identity-register');
var identity_reset_1 = require('./identity-reset');
var identity_users_1 = require('./identity-users');
var identity_user_1 = require('./identity-user');
var identity_roles_1 = require('./identity-roles');
var identity_button_1 = require('./identity-button');
var fr_1 = require('./fr');
exports.fr = fr_1.fr;
function registerComponent(name, viewModel) {
    ko.components.register(name, {
        template: require("text!./" + name + ".html"),
        viewModel: viewModel
    });
}
function register() {
    koPromise.register();
    registerComponent('identity-email', identity_email_1.default);
    registerComponent('identity-forgot', identity_forgot_1.default);
    registerComponent('identity-password', identity_password_1.default);
    registerComponent('identity-login', identity_login_1.default);
    registerComponent('identity-register', identity_register_1.default);
    registerComponent('identity-reset', identity_reset_1.default);
}
exports.register = register;
function registerAdministration(basePath, role) {
    registerComponent('identity-users', identity_users_1.default);
    authentication_1.default.addRoleRoute('users', role, 'identity-users');
    registerComponent('identity-user', identity_user_1.default);
    authentication_1.default.addRoleRoute('user/{id}', role, 'identity-user');
    registerComponent('identity-roles', identity_roles_1.default);
    authentication_1.default.addRoleRoute('roles', role, 'identity-roles');
}
exports.registerAdministration = registerAdministration;
function registerMenu(basePath) {
    registerComponent('identity-button', identity_button_1.default);
    var subMenu = folke_menu_1.default.addCustomSubMenu('identity-button');
    subMenu.addButton(ko.observable('Se déconnecter'), function () { return authentication_1.default.logout(); });
}
exports.registerMenu = registerMenu;
function registerAdministrationMenu(role) {
    var subMenu = folke_menu_1.default.addSubMenu(ko.observable('Administration'), 1, ko.computed(function () { return authentication_1.default.hasRole(role); }));
    subMenu.addRouteButton(ko.observable('Utilisateurs'), 'users');
    subMenu.addRouteButton(ko.observable('Rôles'), 'roles');
}
exports.registerAdministrationMenu = registerAdministrationMenu;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = identity_register_1.default;
