/// <reference types="knockout" />
import { RoleView } from "./services";
export default class IdentityRolesViewModel<TKey> {
    private services;
    roles: KnockoutObservableArray<RoleView<TKey>>;
    name: KnockoutObservable<string>;
    isEdit: KnockoutObservable<boolean>;
    constructor(params: any);
    remove: (role: RoleView<TKey>) => Promise<{}>;
    save: () => void;
    add: () => void;
}
