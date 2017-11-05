/// <reference types="knockout" />
import * as grid from "folke-ko-grid";
import { User } from "./services";
import { Identity } from "./identity";
export declare class IdentityUsersViewModel<TKey> {
    props: {
        identity: Identity<TKey>;
    };
    constructor(props: {
        identity: Identity<TKey>;
    });
    name: KnockoutObservable<string>;
    users: grid.Grid<User<TKey>, {
        limit: number;
        offset: number;
        sortColumn: string;
    }>;
    goUser: (user: User<TKey>) => string;
    render(): HTMLElement;
}
