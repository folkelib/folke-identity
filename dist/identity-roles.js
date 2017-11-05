"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var kjsx_1 = require("kjsx");
var IdentityRolesViewModel = /** @class */ (function () {
    function IdentityRolesViewModel(props) {
        var _this = this;
        this.props = props;
        this.roles = ko.observableArray();
        this.name = ko.observable('');
        this.isEdit = ko.observable(false);
        this.remove = function (role) { return _this.props.identity.services.role.delete({ id: role.id }); };
        this.save = function () {
            _this.isEdit(false);
            _this.props.identity.services.role.create({ name: _this.name() }).then(function (role) { return _this.roles.push(role); });
        };
        this.add = function () { return _this.isEdit(true); };
        props.identity.services.role.getAll({}).then(function (roles) { return _this.roles(roles); });
    }
    IdentityRolesViewModel.prototype.render = function () {
        var _this = this;
        return kjsx_1.React.createElement("section", null,
            kjsx_1.React.createElement("table", { class: "grid" },
                kjsx_1.React.createElement("thead", null,
                    kjsx_1.React.createElement("tr", null,
                        kjsx_1.React.createElement("th", null, "identity.nameTitle"))),
                kjsx_1.React.createElement("tbody", null, kjsx_1.ko_foreach(this.roles, function (role) {
                    return kjsx_1.React.createElement("tr", null,
                        kjsx_1.React.createElement("td", null, role.name),
                        kjsx_1.React.createElement("td", null,
                            kjsx_1.React.createElement("button", { class: "button", click: function () { return _this.remove(role); } }, "identity.delete")));
                }))),
            kjsx_1.ko_if(this.isEdit, function () {
                return kjsx_1.React.createElement("form", { "data-bind": "submit: save" },
                    kjsx_1.React.createElement("input", { type: "text", "data-bind": "textInput: name" }),
                    kjsx_1.React.createElement("button", { class: "button", type: "submit" }, "identity.add"));
            }),
            kjsx_1.ko_ifnot(this.isEdit, function () {
                return kjsx_1.React.createElement("button", { class: "button", "data-bind": "click: add" }, "identity.new");
            }),
            "    ");
    };
    return IdentityRolesViewModel;
}());
exports.IdentityRolesViewModel = IdentityRolesViewModel;
