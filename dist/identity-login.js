"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var ServiceHelpers = require("folke-service-helpers");
var folke_ko_validation_1 = require("folke-ko-validation");
var kjsx_1 = require("kjsx");
var identity_forgot_1 = require("./identity-forgot");
var identity_register_1 = require("./identity-register");
var IdentityLoginViewModel = /** @class */ (function () {
    function IdentityLoginViewModel(props) {
        var _this = this;
        this.props = props;
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired).addValidator(folke_ko_validation_1.isEmail);
        this.password = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.rememberMe = ko.observable(false);
        this.providers = ko.observableArray();
        this.loading = ko.observable(false);
        this.login = function () {
            _this.loading(true);
            _this.props.identity.services.authentication.login({ loginView: { email: _this.email(), password: _this.password(), rememberMe: _this.rememberMe() } }).then(function (loginResult) {
                _this.loading(false);
                if (loginResult.status === 0 /* Success */) {
                    _this.props.identity.updateMe().then(function () { return _this.props.onLogin(); });
                }
            });
        };
        this.forgotPassword = function () { return _this.props.identity.app.showPopin(kjsx_1.React.createElement(identity_forgot_1.IdentityForgotViewModel, { identity: _this.props.identity, onConfirm: _this.props.onLogin })); };
        this.register = function () { return _this.props.identity.app.showPopin(kjsx_1.React.createElement(identity_register_1.default, { identity: _this.props.identity, onRegister: _this.props.onLogin })); };
        this.facebookLogin = function (provider) {
            window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: provider.name, returnUrl: window.location.toString() }), 'oauth', 'dialog');
        };
        this.isValid = ko.pureComputed(function () { return !_this.props.identity.loading() && _this.email.valid() && _this.password.valid(); });
        this.props.identity.services.authentication.getExternalAuthenticationProviders({}).then(function (providers) { return _this.providers(providers); });
    }
    IdentityLoginViewModel.prototype.render = function () {
        var _this = this;
        return kjsx_1.React.createElement("section", { class: "identity-popin popin" },
            kjsx_1.React.createElement("header", null,
                kjsx_1.React.createElement("div", null, "identity.loginTitle")),
            kjsx_1.React.createElement("section", null,
                kjsx_1.React.createElement("form", { submit: this.login },
                    kjsx_1.React.createElement("fieldset", { class: "large" },
                        kjsx_1.React.createElement("label", null, "identity.email"),
                        kjsx_1.React.createElement("input", { type: "text", textInput: this.email, validate: this.email })),
                    kjsx_1.React.createElement("fieldset", { class: "large" },
                        kjsx_1.React.createElement("label", null, "identity.password"),
                        kjsx_1.React.createElement("input", { type: "password", textInput: this.password, validate: this.password })),
                    kjsx_1.React.createElement("fieldset", null,
                        kjsx_1.React.createElement("label", null,
                            kjsx_1.React.createElement("input", { type: "checkbox", checked: this.rememberMe }),
                            "identity.rememberMe ")),
                    kjsx_1.React.createElement("fieldset", { class: "pull-right" },
                        kjsx_1.React.createElement("a", { href: "#", click: this.forgotPassword, class: "hover" }, "identity.forgotPassword")),
                    kjsx_1.React.createElement("footer", null,
                        kjsx_1.React.createElement("button", { class: "button fit", type: "submit", enable: this.isValid }, "identity.loginButton")))),
            kjsx_1.ko_if(ko.pureComputed(function () { return _this.providers().length > 0; }), function () {
                return kjsx_1.React.createElement("div", null,
                    kjsx_1.React.createElement("div", { class: "separator" }, "identity.or"),
                    kjsx_1.React.createElement("section", { class: "social" }, kjsx_1.ko_foreach(_this.providers, function (p) {
                        return kjsx_1.React.createElement("button", { class: "button fit", click: function () { return _this.facebookLogin(p); } },
                            kjsx_1.React.createElement("span", { class: "fa fa-facebook" }),
                            " identity.connectFB, displayName");
                    })));
            }),
            kjsx_1.React.createElement("footer", null,
                "identity.notAmember ",
                kjsx_1.React.createElement("a", { href: "", click: this.register }, "identity.registerNow")));
    };
    IdentityLoginViewModel.prototype.dispose = function () {
    };
    return IdentityLoginViewModel;
}());
exports.IdentityLoginViewModel = IdentityLoginViewModel;
