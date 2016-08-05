import * as ko from "knockout";
import { services, RoleView } from "./services";

export default class IdentityRolesViewModel {
    public roles = ko.observableArray<RoleView>();
    public name = ko.observable('');
    public isEdit = ko.observable(false);

    constructor(params) {
        services.role.getAll({}).then(roles => this.roles(roles));
    }

    public remove = (role: RoleView) => services.role.delete({ id: role.id });
    public save = () => {
        this.isEdit(false);
        services.role.create({ name: this.name() }).then(role => this.roles.push(role))
    };
    public add = () => this.isEdit(true);
}
