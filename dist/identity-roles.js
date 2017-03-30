"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var services_1 = require("./services");
var IdentityRolesViewModel = (function () {
    function IdentityRolesViewModel(params) {
        var _this = this;
        this.services = services_1.get();
        this.roles = ko.observableArray();
        this.name = ko.observable('');
        this.isEdit = ko.observable(false);
        this.remove = function (role) { return _this.services.role.delete({ id: role.id }); };
        this.save = function () {
            _this.isEdit(false);
            _this.services.role.create({ name: _this.name() }).then(function (role) { return _this.roles.push(role); });
        };
        this.add = function () { return _this.isEdit(true); };
        this.services.role.getAll({}).then(function (roles) { return _this.roles(roles); });
    }
    return IdentityRolesViewModel;
}());
exports.default = IdentityRolesViewModel;
