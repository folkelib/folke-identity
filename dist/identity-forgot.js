"use strict";
var services_1 = require('./services');
var Folke = require('folke-core');
var IdentityForgotViewModel = (function () {
    function IdentityForgotViewModel(parameters) {
        var _this = this;
        this.parameters = parameters;
        this.form = services_1.services.factories.createForgotPasswordView({ email: "" });
        this.ask = function () {
            services_1.services.authentication.forgotPassword({ forgotPasswordView: _this.form }).then(function () { return Folke.default.showPopin('identity-reset', _this.parameters); });
        };
        this.login = function () { return Folke.default.showPopin('identity-login', _this.parameters); };
    }
    IdentityForgotViewModel.prototype.dispose = function () {
    };
    return IdentityForgotViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityForgotViewModel;
