"use strict";
var services_1 = require("./services");
var authentication = require("./authentication");
var IdentityPasswordViewModel = (function () {
    function IdentityPasswordViewModel(params) {
        var _this = this;
        this.params = params;
        this.formChange = services_1.services.factories.createChangePasswordView({ confirmPassword: "", newPassword: "", oldPassword: "" });
        this.formSet = services_1.services.factories.createSetPasswordView({ newPassword: "" });
        this.hasPassword = authentication.default.account().hasPassword;
        this.loading = services_1.services.loading;
        this.submitChange = function () { return services_1.services.account.changePassword({ view: _this.formChange }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
        this.submitSet = function () { return services_1.services.account.setPassword({ model: _this.formSet }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
    }
    IdentityPasswordViewModel.prototype.dispose = function () {
    };
    return IdentityPasswordViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityPasswordViewModel;
