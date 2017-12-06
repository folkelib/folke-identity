"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var identity_login_1 = require("./identity-login");
var kjsx_1 = require("kjsx");
var identity_users_1 = require("./identity-users");
var identity_user_1 = require("./identity-user");
var identity_roles_1 = require("./identity-roles");
var folke_ko_promise_1 = require("folke-ko-promise");
folke_ko_promise_1.register();
var Authentication = /** @class */ (function () {
    function Authentication(app, services, loading, menu) {
        var _this = this;
        this.app = app;
        this.services = services;
        this.loading = loading;
        this.menu = menu;
        this.account = ko.observable();
        this.hideEmailConfirmBar = ko.observable(false);
        this.roles = ko.observableArray();
        this.rolesLoaded = ko.observable(null);
        this.accountLoaded = ko.pureComputed(function () { return _this.account(); });
        this.logged = ko.computed(function () { return _this.account() && _this.account().logged; });
        this.logout = function () {
            return _this.services.authentication.logOff({}).then(function () { return _this.updateMe(); });
        };
        this.updateMe();
    }
    Authentication.prototype.updateMe = function () {
        var _this = this;
        this.updateRoles();
        return this.services.account.getMe({}).then(function (account) {
            _this.account(account);
            return account;
        });
    };
    Authentication.prototype.getLogged = function () {
        return this.account.whenNotNull().then(function (account) { return account.logged; });
    };
    Authentication.prototype.updateRoles = function () {
        var _this = this;
        this.rolesLoaded(null);
        return this.services.account.getUserRoles({}).then(function (roles) {
            _this.roles(roles);
            _this.rolesLoaded(true);
            return roles;
        });
    };
    Authentication.prototype.roleObservable = function (roleName) {
        var _this = this;
        return ko.pureComputed(function () { return _this.hasRole(roleName); });
    };
    Authentication.prototype.hasRole = function (roleName) {
        return this.roles().indexOf(roleName) >= 0;
    };
    Authentication.prototype.whenHasRole = function (roleName) {
        var _this = this;
        return this.rolesLoaded.whenNotNull().then(function () { return _this.hasRole(roleName); });
    };
    Authentication.prototype.whenLogged = function () {
        var _this = this;
        return this.getLogged().then(function (logged) {
            if (logged)
                return Promise.resolve(_this.account());
            return new Promise(function (resolve) { return _this.goToLogin(resolve); });
        });
    };
    Authentication.prototype.goToLogin = function (onLogin) {
        this.app.showPopin(kjsx_1.React.createElement(identity_login_1.IdentityLoginViewModel, { identity: this, onLogin: onLogin }));
    };
    Authentication.prototype.addLoggedRoute = function (route) {
        var _this = this;
        this.app.addRoute({ route: route.route, onRoute: function (parameters) { return _this.whenLogged().then(function (x) {
                return route.onRoute(parameters);
            }); } });
    };
    Authentication.prototype.addRoleRoute = function (route, role) {
        var _this = this;
        this.app.addRoute({ route: route.route, onRoute: function (parameters) { return _this.whenLogged().then(function (x) { return _this.whenHasRole(role); })
                .then(function (hasRole) {
                if (hasRole) {
                    return route.onRoute(parameters);
                }
                else {
                    _this.app.hidePopin();
                    return kjsx_1.React.createElement("div", null, "Unauthorized access. Need role " + role);
                }
            }); } });
    };
    Authentication.prototype.message = function (message) {
        switch (message) {
            case "success":
                this.updateMe();
                break;
            case "lockedout":
                break;
            case "requires-verification":
                break;
            case "failure":
                break;
        }
    };
    Authentication.prototype.register = function (adminRole) {
        this.registerAdministration(adminRole);
        this.registerMenu();
        this.registerAdministrationMenu(adminRole);
    };
    Authentication.prototype.registerAdministration = function (role) {
        var _this = this;
        this.addRoleRoute({ route: 'users', onRoute: function () { return kjsx_1.React.createElement(identity_users_1.IdentityUsersViewModel, { identity: _this }); } }, role);
        this.addRoleRoute({ route: 'user/{id}', onRoute: function (params) { return kjsx_1.React.createElement(identity_user_1.IdentityUser, __assign({ identity: _this }, params)); } }, role);
        this.addRoleRoute({ route: 'roles', onRoute: function () { return kjsx_1.React.createElement(identity_roles_1.IdentityRolesViewModel, { identity: _this }); } }, role);
    };
    Authentication.prototype.registerMenu = function () {
        var _this = this;
        if (!this.menu)
            return;
        var subMenu = this.menu.addCustomSubMenu('identity-button');
        subMenu.addButton(ko.observable('Se déconnecter'), function () { return _this.logout(); });
    };
    Authentication.prototype.registerAdministrationMenu = function (role) {
        var _this = this;
        if (!this.menu)
            return;
        var subMenu = this.menu.addSubMenu(ko.observable('Administration'), 1, ko.computed(function () { return _this.hasRole(role); }));
        subMenu.addRouteButton(ko.observable('Utilisateurs'), 'users');
        subMenu.addRouteButton(ko.observable('Rôles'), 'roles');
    };
    return Authentication;
}());
exports.Authentication = Authentication;
