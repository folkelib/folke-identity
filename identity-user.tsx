import * as ko from "knockout";
import { User, Services } from "./services";
import { Identity } from "./identity";
import { React, ko_if, ko_ifnot, ko_foreach, ko_ifdef } from "kjsx";

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

export class IdentityUser<TKey> {
    public user = ko.observable<User<TKey>>();
    public roles = ko.observableArray<RoleView<TKey>>();
    
    constructor(public props: { id: string, identity: Identity<TKey> }) {
        var userId = props['id'];
        props.identity.services.account.get({ id: userId }).then(user => this.user(user));
        props.identity.services.role.getAll({}).then(allRoles => this.roles(allRoles.map(x => new RoleView(x.name, userId, this.props.identity.services)))).then(() => {
            props.identity.services.role.getForUser({ userId: userId }).then(roles => {
                for (var role of roles) {
                    this.roles().filter(x => x.name == role).forEach(x => x.enabled(true));
                }
            });
        });
    }

    render() {
        return ko_ifdef(this.user, user => 
            <section><header>{ user.userName }</header>
        <dl>
            <dt>identity.email</dt>
            <dd> { user.email } </dd>
        </dl>
    
        <ul>{ko_foreach(this.roles, role => 
            <li><label><input type="checkbox" checked={role.checked}/> <span>{role.name}</span></label></li>
        )}
        </ul>
    </section>)
    }
}
