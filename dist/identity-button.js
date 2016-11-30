"use strict";
var authentication_1 = require("./authentication");
var folke_core_1 = require("folke-core");
var IdentityButtonViewModel = (function () {
    function IdentityButtonViewModel(menu) {
        var _this = this;
        this.menu = menu;
        this.logged = authentication_1.default.logged;
        this.account = authentication_1.default.account;
        this.login = function () { return folke_core_1.default.showPopin('identity-login').then(function () { return folke_core_1.default.hidePopin(); }); };
        this.toggle = function () { return _this.menu.collapsed(!_this.menu.collapsed()); };
    }
    return IdentityButtonViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityButtonViewModel;
