import * as ko from "knockout";
import { services, User } from "./services";
import * as authentication from "./authentication";

export class RoleView {
    enabled = ko.observable(false);
    checked = ko.pureComputed({
        read: () => this.enabled(),
        write: (value:boolean) => {
            this.enabled(value);
            if (value) {
                services.role.addUser({ userId: this.userId, roleName: this.name });
            } else {
                services.role.deleteUser({ userId: this.userId, roleName: this.name });
            }
        }
    });
    constructor(public name: string, private userId:string) {}
}

export default class ViewModel {
    public user = ko.observable<User>();
    public roles = ko.observableArray<RoleView>();
    
    constructor(params: { id: string }) {
        var userId = params['id'];
        services.account.get({ id: userId }).then(user => this.user(user));
        services.role.getAll({}).then(allRoles => this.roles(allRoles.map(x => new RoleView(x.name, userId)))).then(() => {
            services.role.getForUser({ userId: userId }).then(roles => {
                for (var role of roles) {
                    this.roles().filter(x => x.name == role).forEach(x => x.enabled(true));
                }
            });
        });
    }
}
