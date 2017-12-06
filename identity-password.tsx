import * as ko from 'knockout';
import { Authentication } from './authentication';
import { ValidableObservable, validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { Identity } from './identity';

export default class IdentityPasswordViewModel<TKey> {
    constructor( private props: { identity: Identity<TKey>, onChanged: () => void }) {}
    public oldPassword = validableObservable("").addValidator(isRequired);
    public newPassword = validableObservable("").addValidator(isRequired);
    public confirmPassword = validableObservable("").addValidator(areSame(this.newPassword));
    public hasPassword = ko.pureComputed(() => this.props.identity.account().hasPassword);
    public loading = this.props.identity.loading;

    public render() {
        return <section class="identity-popin popin">
        <header>
            {/* <popin-close-button></popin-close-button> */}
            <div>identity.changePassword</div>
        </header>
    
        <div>{
            ko_if(this.hasPassword, () => 
            <form submit={this.submitChange}>
                <fieldset>
                    <label>identity.currentPassword</label>
                    <input type="password" textInput={this.oldPassword} validate={this.oldPassword} />
                </fieldset>
                <fieldset>
                    <label>identity.newPassword</label>
                    <input type="password" textInput={this.newPassword} validate={this.newPassword} />
                </fieldset>
                <fieldset>
                    <label>identity.confirmPassword</label>
                    <input type="password" textInput={this.confirmPassword} validate={this.confirmPassword} />
                </fieldset>
                <fieldset>
                    <button type="submit" enable={this.isValid}>identity.edit</button>
                </fieldset>
            </form>
            )}
            { ko_ifnot(this.hasPassword, () =>
            <form submit={this.submitSet}>
                <fieldset>
                    <label>identity.password</label>
                    <input type="password" textInput={this.newPassword} validate={this.newPassword} />
                </fieldset>
                <fieldset>
                    <label>identity.confirmPassword</label>
                    <input type="password" textInput={this.confirmPassword} validate={this.confirmPassword} />
                </fieldset>
                <fieldset>
                    <button type="submit" enable={this.isValid}>identity.edit</button>
                </fieldset>
            </form>
            )}
        </div>
        <footer>
            <a href="#identity-email">identity.editEmail</a>
        </footer>
    </section>
    }

    public dispose() {
    }

    public submitChange = () => this.props.identity.services.account.changePassword({ view: { confirmPassword: this.confirmPassword(), newPassword: this.newPassword(), oldPassword: this.oldPassword() } }).then(() => this.props.onChanged());
    public submitSet = () => this.props.identity.services.account.setPassword({ model: { newPassword: this.newPassword(), confirmPassword: this.confirmPassword() } }).then(() => this.props.onChanged());

    public isValid = ko.pureComputed(() => (this.hasPassword() || this.oldPassword.valid()) && this.newPassword.valid() && this.confirmPassword.valid());
}
