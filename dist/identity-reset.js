"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var folke_ko_validation_1 = require("folke-ko-validation");
var kjsx_1 = require("kjsx");
var IdentityResetViewModel = /** @class */ (function () {
    function IdentityResetViewModel(props) {
        var _this = this;
        this.props = props;
        this.password = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.confirmPassword = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired).addValidator(folke_ko_validation_1.areSame(this.password));
        this.code = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isRequired);
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isEmail);
        this.isValid = ko.pureComputed(function () { return !_this.props.identity.services.loading() && _this.password.valid() && _this.code.valid() && _this.confirmPassword.valid(); });
        this.reset = function () { return _this.props.identity.services.authentication.resetPassword({ resetPasswordView: { code: _this.code(), userId: _this.userId, confirmPassword: _this.confirmPassword(), password: _this.password() } }).then(function () { return _this.props.onReset(); }); };
        if (props.id) {
            this.userId = props.id;
        }
        var code = props['code*'];
        if (code) {
            this.code(code);
        }
    }
    IdentityResetViewModel.prototype.render = function () {
        var _this = this;
        return kjsx_1.React.createElement("section", { class: "identity-popin popin" },
            kjsx_1.React.createElement("header", { class: "popin-header" },
                kjsx_1.React.createElement("div", null, "identity.resetPassword")),
            kjsx_1.React.createElement("section", null,
                kjsx_1.React.createElement("form", { "data-bind": "submit: reset" },
                    kjsx_1.React.createElement("header", null, "identity.enterCodeTitle"),
                    kjsx_1.React.createElement("fieldset", { class: "container" },
                        kjsx_1.ko_ifnot(ko.pureComputed(function () { return !!_this.userId; }), function () {
                            return kjsx_1.React.createElement("fieldset", { class: "large", "data-bind": "ifnot: userId" },
                                kjsx_1.React.createElement("label", null, "identity.email"),
                                kjsx_1.React.createElement("input", { type: "text", textInput: _this.email }));
                        }),
                        kjsx_1.React.createElement("fieldset", { class: "large" },
                            kjsx_1.React.createElement("label", null, "identity.code"),
                            kjsx_1.React.createElement("input", { type: "text", textInput: this.code })),
                        kjsx_1.React.createElement("fieldset", { class: "large" },
                            kjsx_1.React.createElement("label", null, "identity.password"),
                            kjsx_1.React.createElement("input", { type: "password", textInput: this.password })),
                        kjsx_1.React.createElement("fieldset", { class: "large" },
                            kjsx_1.React.createElement("label", null, "identity.confirmPassword"),
                            kjsx_1.React.createElement("input", { type: "password", textInput: this.confirmPassword })),
                        kjsx_1.React.createElement("footer", null,
                            kjsx_1.React.createElement("button", { type: "submit", enable: this.isValid }, "identity.validate"))))));
    };
    IdentityResetViewModel.prototype.dispose = function () {
    };
    return IdentityResetViewModel;
}());
exports.default = IdentityResetViewModel;
