"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kjsx_1 = require("kjsx");
var ConfirmViewModel = /** @class */ (function () {
    function ConfirmViewModel(props) {
        var _this = this;
        this.props = props;
        var accountId = props.id;
        var code = props['code*'];
        props.identity.services.authentication.confirmEmail({ userId: accountId, code: code }).then(function () {
            _this.props.identity.account().emailConfirmed = true;
            _this.props.onConfirm();
        });
    }
    ConfirmViewModel.prototype.render = function () {
        return kjsx_1.React.createElement("div", null);
    };
    return ConfirmViewModel;
}());
exports.default = ConfirmViewModel;
