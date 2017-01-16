import * as ko from "knockout";
import { get, User, Services } from "./services";
import * as authentication from "./authentication";

export class RoleView<TKey> {
    enabled = ko.observable(false);
    checked = ko.pureComputed({
        read: () => this.enabled(),
        write: (value:boolean) => {
            this.enabled(value);
            if (value) {
                this.services.role.addUser({ userId: this.userId, roleName: this.name });
            } else {
                this.services.role.deleteUser({ userId: this.userId, roleName: this.name });
            }
        }
    });
    constructor(public name: string, private userId:string, private services:Services<TKey>) {}
}

export default class ViewModel<TKey> {
    private services = get<TKey>();
    public user = ko.observable<User<TKey>>();
    public roles = ko.observableArray<RoleView<TKey>>();
    
    constructor(params: { id: string }) {
        var userId = params['id'];
        this.services.account.get({ id: userId }).then(user => this.user(user));
        this.services.role.getAll({}).then(allRoles => this.roles(allRoles.map(x => new RoleView(x.name, userId, this.services)))).then(() => {
            this.services.role.getForUser({ userId: userId }).then(roles => {
                for (var role of roles) {
                    this.roles().filter(x => x.name == role).forEach(x => x.enabled(true));
                }
            });
        });
    }
}
