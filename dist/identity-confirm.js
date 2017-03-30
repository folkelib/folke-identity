"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services_1 = require("./services");
var Authentication = require("./authentication");
var ConfirmViewModel = (function () {
    function ConfirmViewModel(params) {
        this.services = services_1.get();
        var accountId = params['id'];
        var code = params['code*'];
        this.services.authentication.confirmEmail({ userId: accountId, code: code }).then(function () {
            Authentication.default.account().emailConfirmed = true;
            params.resolve && params.resolve();
        }, function (error) { return params.reject && params.reject(error); });
    }
    ConfirmViewModel.prototype.dispose = function () { };
    return ConfirmViewModel;
}());
exports.default = ConfirmViewModel;
