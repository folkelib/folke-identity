import * as ko from "knockout";
import * as services from "services/services";
import * as authentication from "./authentication";

class RoleView {
    enabled = ko.observable(false);
    checked = ko.pureComputed({
        read: () => this.enabled(),
        write: value => {
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

class ViewModel {
    public user = ko.observable<authentication.AccountView>();
    public roles = ko.observableArray<RoleView>();
    
    constructor(params) {
        var userId = params['id'];
        services.account.get({ id: userId }).then(user => this.user(user));
        services.role.getAll({}).then(allRoles => this.roles(allRoles.map(x => new RoleView(x.name(), userId)))).then(() => {
            services.role.getForUser({ userId: userId }).then(roles => {
                for (var role of roles) {
                    this.roles().filter(x => x.name == role).forEach(x => x.enabled(true));
                }
            });
        });
    }
}

export var viewModel = ViewModel;