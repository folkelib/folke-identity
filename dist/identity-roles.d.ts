import * as ko from "knockout";
import { RoleView } from "./services";
export default class IdentityRolesViewModel {
    roles: ko.ObservableArray<RoleView>;
    name: ko.Observable<string>;
    isEdit: ko.Observable<boolean>;
    constructor(params: any);
    remove: (role: RoleView) => Promise<{}>;
    save: () => void;
    add: () => ko.Observable<boolean>;
}
