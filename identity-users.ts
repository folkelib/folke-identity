import * as ko from "knockout";
import * as grid from "folke-ko-grid";
import { services, UserSearchFilter, UserViewModel } from "./services";
import * as authentication from './authentication';

export default class IdentityUsersViewModel {
    public filter = services.factories.createUserSearchFilter();

    public users = grid.searchArray({
        request: services.account.search,
        columns: [
            { text: 'Nom', sort: 'userName' },
            { text: 'E-mail', sort: 'email' }
        ],
        parameters: { limit: 10, sortColumn: 'userName', filter: this.filter }
    });

    constructor() {
        this.users.refresh();
    }

    public goUser = (user:UserViewModel) => location.hash = 'user/' + user.id;
}
