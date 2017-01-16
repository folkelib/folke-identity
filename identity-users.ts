import * as ko from "knockout";
import * as grid from "folke-ko-grid";
import { get, UserSearchFilter, User } from "./services";
import * as authentication from './authentication';

export default class IdentityUsersViewModel<TKey> {
    private services = get<TKey>();
    public name = ko.observable("");

    public users = grid.grid({
        request: ({ offset, limit, sortColumn}) => this.services.account.search({ offset: offset, limit: limit, sortColumn: sortColumn, filter: { name: this.name() } }),
        columns: [
            { text: 'Nom', sort: 'userName' },
            { text: 'E-mail', sort: 'email' }
        ],
        parameters: { limit: 10, offset: 0, sortColumn: 'userName' }
    });

    constructor() {
        this.users.refresh();
    }

    public goUser = (user:User<TKey>) => location.hash = 'user/' + user.id;
}
