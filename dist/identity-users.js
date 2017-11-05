"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var grid = require("folke-ko-grid");
var kjsx_1 = require("kjsx");
var IdentityUsersViewModel = /** @class */ (function () {
    function IdentityUsersViewModel(props) {
        var _this = this;
        this.props = props;
        this.name = ko.observable("");
        this.users = grid.grid({
            request: function (_a) {
                var offset = _a.offset, limit = _a.limit, sortColumn = _a.sortColumn;
                return _this.props.identity.services.account.search({ offset: offset, limit: limit, sortColumn: sortColumn, filter: { name: _this.name() } });
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
    IdentityUsersViewModel.prototype.render = function () {
        //     return <grid params="rows: users">
        //     <div class="row" data-bind="click: $parents[1].goUser">
        //         <div class="cell" data-bind="text: userName"></div>
        //         <div class="cell" data-bind="text: email"></div>
        //     </div>
        // </grid>
        return kjsx_1.React.createElement("div", null);
    };
    return IdentityUsersViewModel;
}());
exports.IdentityUsersViewModel = IdentityUsersViewModel;
