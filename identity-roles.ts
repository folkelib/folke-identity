import * as ko from "knockout";
import { get, RoleView } from "./services";

export default class IdentityRolesViewModel<TKey> {
    private services = get<TKey>();
    public roles = ko.observableArray<RoleView<TKey>>();
    public name = ko.observable('');
    public isEdit = ko.observable(false);

    constructor(params: any) {
        this.services.role.getAll({}).then(roles => this.roles(roles));
    }

    public remove = (role: RoleView<TKey>) => this.services.role.delete({ id: role.id });
    public save = () => {
        this.isEdit(false);
        this.services.role.create({ name: this.name() }).then(role => this.roles.push(role))
    };
    public add = () => this.isEdit(true);
}
