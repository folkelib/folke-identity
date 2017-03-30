"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var services_1 = require("./services");
var authentication = require("./authentication");
var Folke = require("folke-core");
var ServiceHelpers = require("folke-ko-service-helpers");
var folke_ko_validation_1 = require("folke-ko-validation");
var IdentityLoginViewModel = (function () {
    function IdentityLoginViewModel(parameters) {
        var _this = this;
        this.parameters = parameters;
        this.services = services_1.get();
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired).addValidator(folke_ko_validation_1.isEmail);
        this.password = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.rememberMe = ko.observable(false);
        this.providers = ko.observableArray();
        this.loading = this.services.loading;
        this.login = function () {
            _this.services.authentication.login({ loginView: { email: _this.email(), password: _this.password(), rememberMe: _this.rememberMe() } }).then(function (loginResult) {
                if (loginResult.status === 0 /* Success */) {
                    authentication.default.updateMe().then(function () { return _this.parameters.resolve && _this.parameters.resolve(); });
                }
            });
        };
        this.forgotPassword = function () { return Folke.default.showPopin('identity-forgot', _this.parameters); };
        this.register = function () { return Folke.default.showPopin('identity-register', _this.parameters); };
        this.facebookLogin = function (provider) {
            window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: provider.authenticationScheme, returnUrl: window.location.toString() }), 'oauth', 'dialog');
        };
        this.isValid = ko.pureComputed(function () { return !_this.services.loading() && _this.email.valid() && _this.password.valid(); });
        this.services.authentication.getExternalAuthenticationProviders({}).then(function (providers) { return _this.providers(providers); });
    }
    IdentityLoginViewModel.prototype.dispose = function () {
    };
    return IdentityLoginViewModel;
}());
exports.default = IdentityLoginViewModel;
