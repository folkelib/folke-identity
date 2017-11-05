import * as ko from "knockout";
import * as grid from "folke-ko-grid";
import { User } from "./services";
import { Identity } from "./identity";
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";

export class IdentityUsersViewModel<TKey> {

    constructor(public props: { identity: Identity<TKey> }) {
        this.users.refresh();
    }

    public name = ko.observable("");

    public users = grid.grid({
        request: ({ offset, limit, sortColumn}) => this.props.identity.services.account.search({ offset: offset, limit: limit, sortColumn: sortColumn, filter: { name: this.name() } }),
        columns: [
            { text: 'Nom', sort: 'userName' },
            { text: 'E-mail', sort: 'email' }
        ],
        parameters: { limit: 10, offset: 0, sortColumn: 'userName' }
    });

    public goUser = (user:User<TKey>) => location.hash = 'user/' + user.id;

    public render(){
    //     return <grid params="rows: users">
    //     <div class="row" data-bind="click: $parents[1].goUser">
    //         <div class="cell" data-bind="text: userName"></div>
    //         <div class="cell" data-bind="text: email"></div>
    //     </div>
    // </grid>
        return <div></div>;
    }
}
