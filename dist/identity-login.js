"use strict";
var ko = require("knockout");
var services_1 = require('./services');
var authentication = require('./authentication');
var Folke = require('folke-core');
var ServiceHelpers = require("folke-ko-service-helpers");
var IdentityLoginViewModel = (function () {
    function IdentityLoginViewModel(parameters) {
        var _this = this;
        this.parameters = parameters;
        this.form = services_1.services.factories.createLoginView({ email: "", password: "", rememberMe: false });
        this.providers = ko.observableArray();
        this.loading = services_1.services.loading;
        this.login = function () {
            services_1.services.authentication.login({ loginView: _this.form }).then(function (loginResult) {
                if (loginResult.status === 0 /* Success */) {
                    authentication.default.updateMe().then(function () { return _this.parameters.resolve(); });
                }
            });
        };
        this.forgotPassword = function () { return Folke.default.showPopin('identity-forgot', _this.parameters); };
        this.register = function () { return Folke.default.showPopin('identity-register', _this.parameters); };
        this.facebookLogin = function (provider) {
            window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: provider.authenticationScheme, returnUrl: window.location.toString() }), 'oauth', 'dialog');
        };
        services_1.services.authentication.getExternalAuthenticationProviders({}).then(function (providers) { return _this.providers(providers); });
    }
    IdentityLoginViewModel.prototype.dispose = function () {
    };
    return IdentityLoginViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityLoginViewModel;
