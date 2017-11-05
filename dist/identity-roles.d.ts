/// <reference types="knockout" />
import { RoleView } from "./services";
import { Identity } from "./identity";
export declare class IdentityRolesViewModel<TKey> {
    props: {
        identity: Identity<TKey>;
    };
    roles: KnockoutObservableArray<RoleView<TKey>>;
    name: KnockoutObservable<string>;
    isEdit: KnockoutObservable<boolean>;
    constructor(props: {
        identity: Identity<TKey>;
    });
    remove: (role: RoleView<TKey>) => Promise<{}>;
    save: () => void;
    add: () => void;
    render(): HTMLElement;
}
