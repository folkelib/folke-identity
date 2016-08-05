import * as grid from "folke-ko-grid";
import { UserSearchFilter, UserViewModel } from "./services";
export default class IdentityUsersViewModel {
    filter: UserSearchFilter;
    users: grid.Grid<UserViewModel, grid.SearchArrayParameters<UserSearchFilter>>;
    constructor();
    goUser: (user: UserViewModel) => string;
}
