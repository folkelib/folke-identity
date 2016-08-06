import * as grid from "folke-ko-grid";
import { UserSearchFilter, User } from "./services";
export default class IdentityUsersViewModel {
    filter: UserSearchFilter;
    users: grid.Grid<User, grid.SearchArrayParameters<UserSearchFilter>>;
    constructor();
    goUser: (user: User) => string;
}
