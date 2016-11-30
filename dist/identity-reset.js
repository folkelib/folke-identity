"use strict";
var services_1 = require("./services");
var IdentityResetViewModel = (function () {
    function IdentityResetViewModel(params) {
        var _this = this;
        this.params = params;
        this.form = services_1.services.factories.createResetPasswordView({ password: "" });
        this.reset = function () { return services_1.services.authentication.resetPassword({ resetPasswordView: _this.form }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
        if (params['id']) {
            this.form.userId(params['id']);
        }
        if (params['code*']) {
            this.form.code(params['code*']);
        }
    }
    IdentityResetViewModel.prototype.dispose = function () {
    };
    return IdentityResetViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityResetViewModel;
