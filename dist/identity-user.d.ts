/// <reference types="knockout" />
import { User } from "./services";
export declare class RoleView {
    name: string;
    private userId;
    enabled: KnockoutObservable<boolean>;
    checked: KnockoutComputed<boolean>;
    constructor(name: string, userId: string);
}
export default class ViewModel {
    user: KnockoutObservable<User>;
    roles: KnockoutObservableArray<RoleView>;
    constructor(params: {
        id: string;
    });
}
