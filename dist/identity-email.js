"use strict";
var services_1 = require("./services");
var authentication = require("./authentication");
var IdentityEmailViewModel = (function () {
    function IdentityEmailViewModel(params) {
        var _this = this;
        this.params = params;
        this.form = services_1.services.factories.createSetEmailView({ email: "" });
        this.loading = services_1.services.loading;
        this.submit = function () { return services_1.services.account.setEmail({ model: _this.form }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
        this.form.email(authentication.default.account().email);
    }
    IdentityEmailViewModel.prototype.dispose = function () {
    };
    return IdentityEmailViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityEmailViewModel;
