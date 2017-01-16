"use strict";
var ko = require("knockout");
var grid = require("folke-ko-grid");
var services_1 = require("./services");
var IdentityUsersViewModel = (function () {
    function IdentityUsersViewModel() {
        var _this = this;
        this.services = services_1.get();
        this.name = ko.observable("");
        this.users = grid.grid({
            request: function (_a) {
                var offset = _a.offset, limit = _a.limit, sortColumn = _a.sortColumn;
                return _this.services.account.search({ offset: offset, limit: limit, sortColumn: sortColumn, filter: { name: _this.name() } });
            },
            columns: [
                { text: 'Nom', sort: 'userName' },
                { text: 'E-mail', sort: 'email' }
            ],
            parameters: { limit: 10, offset: 0, sortColumn: 'userName' }
        });
        this.goUser = function (user) { return location.hash = 'user/' + user.id; };
        this.users.refresh();
    }
    return IdentityUsersViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityUsersViewModel;
