"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var services_1 = require("./services");
var authentication = require("./authentication");
var folke_ko_validation_1 = require("folke-ko-validation");
var IdentityEmailViewModel = (function () {
    function IdentityEmailViewModel(params) {
        var _this = this;
        this.params = params;
        this.services = services_1.get();
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isEmail).addValidator(folke_ko_validation_1.isRequired);
        this.loading = this.services.loading;
        this.isValid = ko.pureComputed(function () { return _this.email.valid() && !_this.loading(); });
        this.submit = function () { return _this.services.account.setEmail({ model: { email: _this.email() } }).then(function () { return _this.params.resolve && _this.params.resolve(); }); };
        this.email(authentication.default.account().email);
    }
    IdentityEmailViewModel.prototype.dispose = function () {
    };
    return IdentityEmailViewModel;
}());
exports.default = IdentityEmailViewModel;
