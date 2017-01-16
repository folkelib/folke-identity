"use strict";
var ko = require("knockout");
var services_1 = require("./services");
var folke_ko_validation_1 = require("folke-ko-validation");
var IdentityResetViewModel = (function () {
    function IdentityResetViewModel(params) {
        var _this = this;
        this.params = params;
        this.services = services_1.get();
        this.password = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.confirmPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired).addValidator(folke_ko_validation_1.areSame(this.password));
        this.code = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.isValid = ko.pureComputed(function () { return !_this.services.loading() && _this.password.valid() && _this.code.valid() && _this.confirmPassword.valid(); });
        this.reset = function () { return _this.services.authentication.resetPassword({ resetPasswordView: { code: _this.code(), userId: _this.userId, confirmPassword: _this.confirmPassword(), password: _this.password() } }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
        if (params['id']) {
            this.userId = params['id'];
        }
        if (params['code*']) {
            this.code(params['code*']);
        }
    }
    IdentityResetViewModel.prototype.dispose = function () {
    };
    return IdentityResetViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityResetViewModel;
