/// <reference types="knockout" />
import * as grid from "folke-ko-grid";
import { User } from "./services";
export default class IdentityUsersViewModel<TKey> {
    private services;
    name: KnockoutObservable<string>;
    users: grid.Grid<User<TKey>, {
        limit: number;
        offset: number;
        sortColumn: string;
    }>;
    constructor();
    goUser: (user: User<TKey>) => string;
}
