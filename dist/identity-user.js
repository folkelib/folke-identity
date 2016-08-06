"use strict";
var ko = require("knockout");
var services_1 = require("./services");
var RoleView = (function () {
    function RoleView(name, userId) {
        var _this = this;
        this.name = name;
        this.userId = userId;
        this.enabled = ko.observable(false);
        this.checked = ko.pureComputed({
            read: function () { return _this.enabled(); },
            write: function (value) {
                _this.enabled(value);
                if (value) {
                    services_1.services.role.addUser({ userId: _this.userId, roleName: _this.name });
                }
                else {
                    services_1.services.role.deleteUser({ userId: _this.userId, roleName: _this.name });
                }
            }
        });
    }
    return RoleView;
}());
exports.RoleView = RoleView;
var ViewModel = (function () {
    function ViewModel(params) {
        var _this = this;
        this.user = ko.observable();
        this.roles = ko.observableArray();
        var userId = params['id'];
        services_1.services.account.get({ id: userId }).then(function (user) { return _this.user(user); });
        services_1.services.role.getAll({}).then(function (allRoles) { return _this.roles(allRoles.map(function (x) { return new RoleView(x.name, userId); })); }).then(function () {
            services_1.services.role.getForUser({ userId: userId }).then(function (roles) {
                for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                    var role = roles_1[_i];
                    _this.roles().filter(function (x) { return x.name == role; }).forEach(function (x) { return x.enabled(true); });
                }
            });
        });
    }
    return ViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewModel;
