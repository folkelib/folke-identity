"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("./services");
var ko = require("knockout");
var folke_core_1 = require("folke-core");
var Authentication = (function () {
    function Authentication() {
        var _this = this;
        this.account = ko.observable();
        this.hideEmailConfirmBar = ko.observable(false);
        this.roles = ko.observableArray();
        this.rolesLoaded = ko.observable(null);
        this.accountLoaded = ko.pureComputed(function () { return _this.account(); });
        this.logged = ko.computed(function () { return _this.account() && _this.account().logged; });
        this.logout = function () {
            return services_1.get().authentication.logOff({}).then(function () { return _this.updateMe(); });
        };
    }
    Authentication.prototype.updateMe = function () {
        var _this = this;
        this.updateRoles();
        return services_1.get().account.getMe({}).then(function (account) {
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
        return services_1.get().account.getUserRoles({}).then(function (roles) {
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
            return folke_core_1.default.showPopin('identity-login');
        });
    };
    Authentication.prototype.addLoggedRoute = function (route, viewId) {
        var _this = this;
        folke_core_1.default.addRoute(route, function (parameters) { return _this.whenLogged().then(function (x) { return folke_core_1.default.goToView(viewId, parameters); }); });
    };
    Authentication.prototype.addRoleRoute = function (route, role, viewId) {
        var _this = this;
        folke_core_1.default.addRoute(route, function (parameters) { return _this.whenLogged().then(function (x) { return _this.whenHasRole(role); })
            .then(function (hasRole) {
            if (hasRole) {
                folke_core_1.default.goToView(viewId, parameters);
            }
            else {
                folke_core_1.default.hidePopin();
                console.error("Unauthorized access. Need role " + role);
            }
        }); });
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
    return Authentication;
}());
exports.Authentication = Authentication;
exports.default = new Authentication();
