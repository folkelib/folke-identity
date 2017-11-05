"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var folke_ko_validation_1 = require("folke-ko-validation");
var kjsx_1 = require("kjsx");
var identity_reset_1 = require("./identity-reset");
var IdentityForgotViewModel = /** @class */ (function () {
    function IdentityForgotViewModel(props) {
        var _this = this;
        this.props = props;
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isEmail).addValidator(folke_ko_validation_1.isRequired);
        this.ask = function () {
            _this.props.identity.services.authentication.forgotPassword({ forgotPasswordView: { email: _this.email() } }).then(function () { return _this.props.identity.app.showPopin(kjsx_1.React.createElement(identity_reset_1.default, { identity: _this.props.identity, onReset: _this.props.onConfirm })); });
        };
        this.login = function () { return _this.props.identity.goToLogin(_this.props.onConfirm); };
        this.isValid = ko.pureComputed(function () { return !_this.props.identity.services.loading() && _this.email.valid(); });
    }
    IdentityForgotViewModel.prototype.render = function () {
        return kjsx_1.React.createElement("section", { class: "identity-popin popin" },
            kjsx_1.React.createElement("header", null,
                kjsx_1.React.createElement("div", null, "identity.accountForgot")),
            kjsx_1.React.createElement("section", null,
                kjsx_1.React.createElement("form", { submit: this.ask },
                    kjsx_1.React.createElement("div", null, "identity.accountForgotSubtitle"),
                    kjsx_1.React.createElement("fieldset", { class: "large" },
                        kjsx_1.React.createElement("label", null, "identity.email"),
                        kjsx_1.React.createElement("input", { type: "text", textInput: this.email })),
                    kjsx_1.React.createElement("button", { class: "button purple fit", enable: this.isValid, type: "submit" }, "identity.submit"))),
            kjsx_1.React.createElement("footer", null,
                "identity.backTo ",
                kjsx_1.React.createElement("a", { "data-bind": "click: login", href: "" }, "identity.signin")));
    };
    IdentityForgotViewModel.prototype.dispose = function () {
    };
    return IdentityForgotViewModel;
}());
exports.IdentityForgotViewModel = IdentityForgotViewModel;
