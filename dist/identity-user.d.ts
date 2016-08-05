import * as ko from "knockout";
import { UserViewModel } from "./services";
export declare class RoleView {
    name: string;
    private userId;
    enabled: ko.Observable<boolean>;
    checked: ko.PureComputed<boolean>;
    constructor(name: string, userId: string);
}
export default class ViewModel {
    user: ko.Observable<UserViewModel>;
    roles: ko.ObservableArray<RoleView>;
    constructor(params: any);
}
