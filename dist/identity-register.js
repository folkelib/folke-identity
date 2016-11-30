"use strict";
var services_1 = require("./services");
var Authentication = require("./authentication");
var Folke = require("folke-core");
var ServiceHelpers = require("folke-ko-service-helpers");
var IdentityRegisterViewModel = (function () {
    function IdentityRegisterViewModel(params) {
        var _this = this;
        this.params = params;
        this.form = services_1.services.factories.createRegisterView({ email: "", password: "" });
        this.loading = services_1.services.loading;
        this.login = function () { return Folke.default.showPopin('identity-login', _this.params); };
        this.register = function () {
            services_1.services.authentication.register({ registerView: _this.form }).then(function (view) {
                Authentication.default.hideEmailConfirmBar(true);
                Authentication.default.account(view);
                return view;
            }).then(function (view) { return _this.params.resolve && _this.params.resolve(view); });
        };
        this.facebookLogin = function () {
            window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: 'Facebook', returnUrl: window.location.toString() }), 'oauth', 'dialog');
        };
    }
    IdentityRegisterViewModel.prototype.dispose = function () {
    };
    return IdentityRegisterViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityRegisterViewModel;
