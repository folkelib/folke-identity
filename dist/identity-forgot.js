"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var services_1 = require("./services");
var Folke = require("folke-core");
var folke_ko_validation_1 = require("folke-ko-validation");
var IdentityForgotViewModel = (function () {
    function IdentityForgotViewModel(parameters) {
        var _this = this;
        this.parameters = parameters;
        this.services = services_1.get();
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isEmail).addValidator(folke_ko_validation_1.isRequired);
        this.ask = function () {
            _this.services.authentication.forgotPassword({ forgotPasswordView: { email: _this.email() } }).then(function () { return Folke.default.showPopin('identity-reset', _this.parameters); });
        };
        this.login = function () { return Folke.default.showPopin('identity-login', _this.parameters); };
        this.isValid = ko.pureComputed(function () { return !_this.services.loading() && _this.email.valid(); });
    }
    IdentityForgotViewModel.prototype.dispose = function () {
    };
    return IdentityForgotViewModel;
}());
exports.default = IdentityForgotViewModel;
