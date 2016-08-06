"use strict";
var grid = require("folke-ko-grid");
var services_1 = require("./services");
var IdentityUsersViewModel = (function () {
    function IdentityUsersViewModel() {
        this.filter = services_1.services.factories.createUserSearchFilter({ name: "" });
        this.users = grid.searchArray({
            request: services_1.services.account.search,
            columns: [
                { text: 'Nom', sort: 'userName' },
                { text: 'E-mail', sort: 'email' }
            ],
            parameters: { limit: 10, sortColumn: 'userName', filter: this.filter }
        });
        this.goUser = function (user) { return location.hash = 'user/' + user.id; };
        this.users.refresh();
    }
    return IdentityUsersViewModel;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IdentityUsersViewModel;
