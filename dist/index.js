"use strict";
var authentication_1 = require("./authentication");
var folke_menu_1 = require("folke-menu");
var ko = require("knockout");
var koPromise = require("folke-ko-promise");
var services_1 = require("./services");
var identity_email_1 = require("./identity-email");
var identity_forgot_1 = require("./identity-forgot");
var identity_password_1 = require("./identity-password");
var identity_login_1 = require("./identity-login");
var identity_register_1 = require("./identity-register");
var identity_reset_1 = require("./identity-reset");
var identity_users_1 = require("./identity-users");
var identity_user_1 = require("./identity-user");
var identity_roles_1 = require("./identity-roles");
var identity_button_1 = require("./identity-button");
var fr_1 = require("./fr");
exports.fr = fr_1.fr;
var authentication_2 = require("./authentication");
exports.authentication = authentication_2.default;
var identity_confirm_1 = require("./identity-confirm");
exports.ConfirmViewModel = identity_confirm_1.default;
var identity_login_2 = require("./identity-login");
exports.IdentityLoginViewModel = identity_login_2.default;
var identity_email_2 = require("./identity-email");
exports.IdentityEmailViewModel = identity_email_2.default;
var identity_password_2 = require("./identity-password");
exports.IdentityPasswordViewModel = identity_password_2.default;
var identity_register_2 = require("./identity-register");
exports.IdentityRegisterViewModel = identity_register_2.default;
var identity_reset_2 = require("./identity-reset");
exports.IdentityResetViewModel = identity_reset_2.default;
var identity_roles_2 = require("./identity-roles");
exports.IdentityRolesViewModel = identity_roles_2.default;
var identity_user_2 = require("./identity-user");
exports.RoleView = identity_user_2.default;
var identity_users_2 = require("./identity-users");
exports.IdentityUsersViewModel = identity_users_2.default;
function registerComponent(name, viewModel) {
    ko.components.register(name, {
        template: require("./" + name + ".html"),
        viewModel: viewModel
    });
}
function register(services, role) {
    registerBase(services);
    authentication_1.default.updateMe();
    registerAdministration(role);
    registerMenu();
    registerAdministrationMenu(role);
}
exports.register = register;
function registerBase(services) {
    services_1.register(services);
    koPromise.register();
    registerComponent('identity-email', identity_email_1.default);
    registerComponent('identity-forgot', identity_forgot_1.default);
    registerComponent('identity-password', identity_password_1.default);
    registerComponent('identity-login', identity_login_1.default);
    registerComponent('identity-register', identity_register_1.default);
    registerComponent('identity-reset', identity_reset_1.default);
}
exports.registerBase = registerBase;
function registerAdministration(role) {
    registerComponent('identity-users', identity_users_1.default);
    authentication_1.default.addRoleRoute('users', role, 'identity-users');
    registerComponent('identity-user', identity_user_1.default);
    authentication_1.default.addRoleRoute('user/{id}', role, 'identity-user');
    registerComponent('identity-roles', identity_roles_1.default);
    authentication_1.default.addRoleRoute('roles', role, 'identity-roles');
}
exports.registerAdministration = registerAdministration;
function registerMenu() {
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
exports.default = register;
