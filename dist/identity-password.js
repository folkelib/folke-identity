"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var services_1 = require("./services");
var authentication = require("./authentication");
var folke_ko_validation_1 = require("folke-ko-validation");
var IdentityPasswordViewModel = (function () {
    function IdentityPasswordViewModel(params) {
        var _this = this;
        this.params = params;
        this.services = services_1.get();
        this.oldPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.newPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.confirmPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.areSame(this.newPassword));
        this.hasPassword = ko.pureComputed(function () { return authentication.default.account().hasPassword; });
        this.loading = this.services.loading;
        this.submitChange = function () { return _this.services.account.changePassword({ view: { confirmPassword: _this.confirmPassword(), newPassword: _this.newPassword(), oldPassword: _this.oldPassword() } }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
        this.submitSet = function () { return _this.services.account.setPassword({ model: { newPassword: _this.newPassword() } }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
        this.isValid = ko.pureComputed(function () { return (_this.hasPassword() || _this.oldPassword.valid()) && _this.newPassword.valid() && _this.confirmPassword.valid(); });
    }
    IdentityPasswordViewModel.prototype.dispose = function () {
    };
    return IdentityPasswordViewModel;
}());
exports.default = IdentityPasswordViewModel;
