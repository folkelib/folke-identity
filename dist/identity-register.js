"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var folke_ko_validation_1 = require("folke-ko-validation");
var kjsx_1 = require("kjsx");
var folke_service_helpers_1 = require("folke-service-helpers");
var IdentityRegisterViewModel = /** @class */ (function () {
    function IdentityRegisterViewModel(props) {
        var _this = this;
        this.props = props;
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isEmail).addValidator(folke_ko_validation_1.isRequired);
        this.password = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.confirmPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.areSame(this.password));
        this.isValid = ko.pureComputed(function () { return !_this.props.identity.loading() && _this.email.valid() && _this.password.valid() && _this.confirmPassword.valid(); });
        this.login = function () { return _this.props.identity.goToLogin(_this.props.onRegister); };
        this.register = function () {
            _this.props.identity.services.authentication.register({ registerView: { email: _this.email(), password: _this.password(), confirmPassword: _this.confirmPassword() } }).then(function (view) {
                _this.props.identity.hideEmailConfirmBar(true);
                _this.props.identity.account(view);
                return view;
            }).then(function (view) { return _this.props.onRegister(); });
        };
        this.facebookLogin = function () {
            window.open('/api/authentication/external-login' + folke_service_helpers_1.getQueryString({ provider: 'Facebook', returnUrl: window.location.toString() }), 'oauth', 'dialog');
        };
    }
    IdentityRegisterViewModel.prototype.render = function () {
        return kjsx_1.React.createElement("section", { class: "identity-popin popin" },
            kjsx_1.React.createElement("header", null,
                kjsx_1.React.createElement("div", null, "identity.createAccounttitle")),
            kjsx_1.React.createElement("section", null,
                kjsx_1.React.createElement("form", { submit: this.register },
                    kjsx_1.React.createElement("fieldset", { class: "large" },
                        kjsx_1.React.createElement("label", null, "identity.email"),
                        kjsx_1.React.createElement("input", { type: "text", textInput: this.email, validate: this.email })),
                    kjsx_1.React.createElement("fieldset", { class: "large" },
                        kjsx_1.React.createElement("label", null, "identity.password"),
                        kjsx_1.React.createElement("input", { type: "password", textInput: this.password, validate: this.password })),
                    kjsx_1.React.createElement("fieldset", { class: "large" },
                        kjsx_1.React.createElement("label", null, "identity.confirmPassword"),
                        kjsx_1.React.createElement("input", { type: "password", textInput: this.confirmPassword, validate: this.confirmPassword })),
                    kjsx_1.React.createElement("div", null,
                        kjsx_1.React.createElement("button", { type: "submit", class: "fit button", enable: this.isValid }, "identity.signupButton")))),
            kjsx_1.React.createElement("div", { class: "separator" }, "identity.or"),
            kjsx_1.React.createElement("section", { class: "social" },
                kjsx_1.React.createElement("button", { class: "button fit", click: this.facebookLogin },
                    kjsx_1.React.createElement("span", { class: "fa fa-facebook" }),
                    " identity.signupSocial")),
            kjsx_1.React.createElement("footer", null,
                "identity.alreadyMember ",
                kjsx_1.React.createElement("a", { href: "", click: this.login }, "identity.loginButton")));
    };
    IdentityRegisterViewModel.prototype.dispose = function () {
    };
    return IdentityRegisterViewModel;
}());
exports.default = IdentityRegisterViewModel;
