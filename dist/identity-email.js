"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var folke_ko_validation_1 = require("folke-ko-validation");
var kjsx_1 = require("kjsx");
var IdentityEmailViewModel = /** @class */ (function () {
    function IdentityEmailViewModel() {
        var _this = this;
        this.email = folke_ko_validation_1.validableObservable("").addValidator(folke_ko_validation_1.isEmail).addValidator(folke_ko_validation_1.isRequired);
        this.isValid = ko.pureComputed(function () { return _this.email.valid() && !_this.props.identity.loading(); });
        this.submit = function () { return _this.props.identity.services.account.setEmail({ model: { email: _this.email() } }).then(function () { return _this.props.onSubmit(); }); };
    }
    IdentityEmailViewModel.prototype.render = function () {
        this.email(this.props.identity.account().email);
        return kjsx_1.React.createElement("section", { class: "identity-popin popin" },
            kjsx_1.React.createElement("header", null,
                kjsx_1.React.createElement("div", null, "Edit e-mail")),
            kjsx_1.React.createElement("section", null,
                kjsx_1.React.createElement("form", { submit: this.submit },
                    kjsx_1.React.createElement("fieldset", { class: "large" },
                        kjsx_1.React.createElement("label", null, "E-mail"),
                        kjsx_1.React.createElement("input", { type: "text", textInput: this.email })),
                    kjsx_1.React.createElement("fieldset", null,
                        kjsx_1.React.createElement("button", { class: "button fit", type: "submit", enable: this.isValid }, "Edit")))),
            kjsx_1.React.createElement("footer", null,
                kjsx_1.React.createElement("a", { href: "#identity-password" }, "Change password")));
    };
    IdentityEmailViewModel.prototype.dispose = function () {
    };
    return IdentityEmailViewModel;
}());
exports.default = IdentityEmailViewModel;
