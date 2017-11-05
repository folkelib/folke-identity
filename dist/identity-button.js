"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kjsx_1 = require("kjsx");
var IdentityButtonViewModel = /** @class */ (function () {
    function IdentityButtonViewModel() {
    }
    IdentityButtonViewModel.prototype.render = function () {
        var _this = this;
        var logged = this.props.identity.logged;
        var account = this.props.identity.account;
        var menu = this.props.identity.menu;
        if (!menu)
            return kjsx_1.React.createElement("div", null);
        var login = function () { return _this.props.identity.goToLogin(function () { return _this.props.identity.app.hidePopin(); }); };
        var toggle = function () { return menu.collapsed(!menu.collapsed()); };
        return kjsx_1.React.createElement("div", null,
            kjsx_1.ko_if(logged, function () {
                return kjsx_1.React.createElement("div", null,
                    kjsx_1.React.createElement("button", { click: toggle }, account().userName),
                    kjsx_1.ko_ifnot(menu.collapsed, function () {
                        return kjsx_1.React.createElement("ul", null,
                            " ",
                            kjsx_1.ko_foreach(menu.menu, function (m) {
                                return kjsx_1.React.createElement("li", { visible: m.visible });
                            }));
                    }));
            }),
            kjsx_1.ko_ifnot(logged, function () {
                return kjsx_1.React.createElement("button", { click: login }, "Login");
            }),
            " ");
    };
    return IdentityButtonViewModel;
}());
exports.default = IdentityButtonViewModel;
