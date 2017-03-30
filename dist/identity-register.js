"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var services_1 = require("./services");
var Authentication = require("./authentication");
var Folke = require("folke-core");
var ServiceHelpers = require("folke-ko-service-helpers");
var folke_ko_validation_1 = require("folke-ko-validation");
var IdentityRegisterViewModel = (function () {
    function IdentityRegisterViewModel(params) {
        var _this = this;
        this.params = params;
        this.services = services_1.get();
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isEmail).addValidator(folke_ko_validation_1.isRequired);
        this.password = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.confirmPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.areSame(this.password));
        this.isValid = ko.pureComputed(function () { return !_this.services.loading() && _this.email.valid() && _this.password.valid() && _this.confirmPassword.valid(); });
        this.loading = this.services.loading;
        this.login = function () { return Folke.default.showPopin('identity-login', _this.params); };
        this.register = function () {
            _this.services.authentication.register({ registerView: { email: _this.email(), password: _this.password(), confirmPassword: _this.confirmPassword() } }).then(function (view) {
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
exports.default = IdentityRegisterViewModel;
