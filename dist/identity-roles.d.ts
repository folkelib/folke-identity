/// <reference types="knockout" />
import { RoleView } from "./services";
export default class IdentityRolesViewModel {
    roles: KnockoutObservableArray<RoleView>;
    name: KnockoutObservable<string>;
    isEdit: KnockoutObservable<boolean>;
    constructor(params: any);
    remove: (role: RoleView) => Promise<{}>;
    save: () => void;
    add: () => void;
}
