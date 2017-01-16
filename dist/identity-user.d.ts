/// <reference types="knockout" />
import { User, Services } from "./services";
export declare class RoleView<TKey> {
    name: string;
    private userId;
    private services;
    enabled: KnockoutObservable<boolean>;
    checked: KnockoutComputed<boolean>;
    constructor(name: string, userId: string, services: Services<TKey>);
}
export default class ViewModel<TKey> {
    private services;
    user: KnockoutObservable<User<TKey>>;
    roles: KnockoutObservableArray<RoleView<TKey>>;
    constructor(params: {
        id: string;
    });
}
