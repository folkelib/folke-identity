﻿import * as ko from "knockout";
import * as grid from "../folke-ko-grid/folke-ko-grid";
import * as services from "services/services";
import * as authentication from './authentication';

export class IdentityUsersViewModel {
    public filter = new services.UserSearchFilter();

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

    public goUser = (user:authentication.AccountView) => location.hash = 'user/' + user.id;
}

export var viewModel = IdentityUsersViewModel;