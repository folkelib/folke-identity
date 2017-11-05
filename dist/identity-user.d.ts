/// <reference types="knockout" />
import { User, Services } from "./services";
import { Identity } from "./identity";
export declare class RoleView<TKey> {
    name: string;
    private userId;
    private services;
    enabled: KnockoutObservable<boolean>;
    checked: KnockoutComputed<boolean>;
    constructor(name: string, userId: string, services: Services<TKey>);
}
export declare class IdentityUser<TKey> {
    props: {
        id: string;
        identity: Identity<TKey>;
    };
    user: KnockoutObservable<User<TKey>>;
    roles: KnockoutObservableArray<RoleView<TKey>>;
    constructor(props: {
        id: string;
        identity: Identity<TKey>;
    });
    render(): KnockoutObservableArray<HTMLElement>;
}
