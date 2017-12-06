"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var folke_ko_validation_1 = require("folke-ko-validation");
var kjsx_1 = require("kjsx");
var IdentityPasswordViewModel = /** @class */ (function () {
    function IdentityPasswordViewModel(props) {
        var _this = this;
        this.props = props;
        this.oldPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.newPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.confirmPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.areSame(this.newPassword));
        this.hasPassword = ko.pureComputed(function () { return _this.props.identity.account().hasPassword; });
        this.loading = this.props.identity.loading;
        this.submitChange = function () { return _this.props.identity.services.account.changePassword({ view: { confirmPassword: _this.confirmPassword(), newPassword: _this.newPassword(), oldPassword: _this.oldPassword() } }).then(function () { return _this.props.onChanged(); }); };
        this.submitSet = function () { return _this.props.identity.services.account.setPassword({ model: { newPassword: _this.newPassword(), confirmPassword: _this.confirmPassword() } }).then(function () { return _this.props.onChanged(); }); };
        this.isValid = ko.pureComputed(function () { return (_this.hasPassword() || _this.oldPassword.valid()) && _this.newPassword.valid() && _this.confirmPassword.valid(); });
    }
    IdentityPasswordViewModel.prototype.render = function () {
        var _this = this;
        return kjsx_1.React.createElement("section", { class: "identity-popin popin" },
            kjsx_1.React.createElement("header", null,
                kjsx_1.React.createElement("div", null, "identity.changePassword")),
            kjsx_1.React.createElement("div", null,
                kjsx_1.ko_if(this.hasPassword, function () {
                    return kjsx_1.React.createElement("form", { submit: _this.submitChange },
                        kjsx_1.React.createElement("fieldset", null,
                            kjsx_1.React.createElement("label", null, "identity.currentPassword"),
                            kjsx_1.React.createElement("input", { type: "password", textInput: _this.oldPassword, validate: _this.oldPassword })),
                        kjsx_1.React.createElement("fieldset", null,
                            kjsx_1.React.createElement("label", null, "identity.newPassword"),
                            kjsx_1.React.createElement("input", { type: "password", textInput: _this.newPassword, validate: _this.newPassword })),
                        kjsx_1.React.createElement("fieldset", null,
                            kjsx_1.React.createElement("label", null, "identity.confirmPassword"),
                            kjsx_1.React.createElement("input", { type: "password", textInput: _this.confirmPassword, validate: _this.confirmPassword })),
                        kjsx_1.React.createElement("fieldset", null,
                            kjsx_1.React.createElement("button", { type: "submit", enable: _this.isValid }, "identity.edit")));
                }),
                kjsx_1.ko_ifnot(this.hasPassword, function () {
                    return kjsx_1.React.createElement("form", { submit: _this.submitSet },
                        kjsx_1.React.createElement("fieldset", null,
                            kjsx_1.React.createElement("label", null, "identity.password"),
                            kjsx_1.React.createElement("input", { type: "password", textInput: _this.newPassword, validate: _this.newPassword })),
                        kjsx_1.React.createElement("fieldset", null,
                            kjsx_1.React.createElement("label", null, "identity.confirmPassword"),
                            kjsx_1.React.createElement("input", { type: "password", textInput: _this.confirmPassword, validate: _this.confirmPassword })),
                        kjsx_1.React.createElement("fieldset", null,
                            kjsx_1.React.createElement("button", { type: "submit", enable: _this.isValid }, "identity.edit")));
                })),
            kjsx_1.React.createElement("footer", null,
                kjsx_1.React.createElement("a", { href: "#identity-email" }, "identity.editEmail")));
    };
    IdentityPasswordViewModel.prototype.dispose = function () {
    };
    return IdentityPasswordViewModel;
}());
exports.default = IdentityPasswordViewModel;
