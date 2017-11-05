"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var kjsx_1 = require("kjsx");
var RoleView = /** @class */ (function () {
    function RoleView(name, userId, services) {
        var _this = this;
        this.name = name;
        this.userId = userId;
        this.services = services;
        this.enabled = ko.observable(false);
        this.checked = ko.pureComputed({
            read: function () { return _this.enabled(); },
            write: function (value) {
                _this.enabled(value);
                if (value) {
                    _this.services.role.addUser({ userId: _this.userId, roleName: _this.name });
                }
                else {
                    _this.services.role.deleteUser({ userId: _this.userId, roleName: _this.name });
                }
            }
        });
    }
    return RoleView;
}());
exports.RoleView = RoleView;
var IdentityUser = /** @class */ (function () {
    function IdentityUser(props) {
        var _this = this;
        this.props = props;
        this.user = ko.observable();
        this.roles = ko.observableArray();
        var userId = props['id'];
        props.identity.services.account.get({ id: userId }).then(function (user) { return _this.user(user); });
        props.identity.services.role.getAll({}).then(function (allRoles) { return _this.roles(allRoles.map(function (x) { return new RoleView(x.name, userId, _this.props.identity.services); })); }).then(function () {
            props.identity.services.role.getForUser({ userId: userId }).then(function (roles) {
                for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                    var role = roles_1[_i];
                    _this.roles().filter(function (x) { return x.name == role; }).forEach(function (x) { return x.enabled(true); });
                }
            });
        });
    }
    IdentityUser.prototype.render = function () {
        var _this = this;
        return kjsx_1.ko_ifdef(this.user, function (user) {
            return kjsx_1.React.createElement("section", null,
                kjsx_1.React.createElement("header", null, user.userName),
                kjsx_1.React.createElement("dl", null,
                    kjsx_1.React.createElement("dt", null, "identity.email"),
                    kjsx_1.React.createElement("dd", null,
                        " ",
                        user.email,
                        " ")),
                kjsx_1.React.createElement("ul", null, kjsx_1.ko_foreach(_this.roles, function (role) {
                    return kjsx_1.React.createElement("li", null,
                        kjsx_1.React.createElement("label", null,
                            kjsx_1.React.createElement("input", { type: "checkbox", checked: role.checked }),
                            " ",
                            kjsx_1.React.createElement("span", null, role.name)));
                })));
        });
    };
    return IdentityUser;
}());
exports.IdentityUser = IdentityUser;
