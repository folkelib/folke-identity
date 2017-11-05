import * as ko from "knockout";
import { RoleView } from "./services";
import { Identity } from "./identity";
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";

export class IdentityRolesViewModel<TKey> {
    public roles = ko.observableArray<RoleView<TKey>>();
    public name = ko.observable('');
    public isEdit = ko.observable(false);

    constructor(public props: { identity: Identity<TKey>}) {
        props.identity.services.role.getAll({}).then(roles => this.roles(roles));
    }

    public remove = (role: RoleView<TKey>) => this.props.identity.services.role.delete({ id: role.id });
    public save = () => {
        this.isEdit(false);
        this.props.identity.services.role.create({ name: this.name() }).then(role => this.roles.push(role))
    };
    public add = () => this.isEdit(true);

    public render(){
        return <section><table class="grid">
        <thead><tr>
            <th>identity.nameTitle</th>
        </tr></thead>
        <tbody>
            {ko_foreach(this.roles, role => 
        <tr>
            <td>{role.name}</td>
            <td>
                <button class="button" click={() => this.remove(role)}>identity.delete</button>
            </td>
        </tr>
        )}
        </tbody>
    </table>
    { ko_if(this.isEdit, () => 
    <form data-bind="submit: save">
        <input type="text" data-bind="textInput: name"/>
        <button class="button" type="submit">identity.add</button>
    </form>
    )}
    { ko_ifnot(this.isEdit, () => 
    <button class="button" data-bind="click: add">identity.new</button>
)}    </section>;
    }
}
