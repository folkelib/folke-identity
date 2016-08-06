"use strict";
var services_1 = require('./services');
var Authentication = require('./authentication');
var ConfirmViewModel = (function () {
    function ConfirmViewModel(params) {
        var accountId = params['id'];
        var code = params['code*'];
        services_1.services.authentication.confirmEmail({ userId: accountId, code: code }).then(function () {
            Authentication.default.account().emailConfirmed = true;
            params.resolve();
        }, function (error) { return params.reject(error); });
    }
    ConfirmViewModel.prototype.dispose = function () { };
    return ConfirmViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ConfirmViewModel;
