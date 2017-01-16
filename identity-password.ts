import ko = require("knockout");
import { get, ChangePasswordView, SetPasswordView } from './services';
import authentication = require('./authentication');
import * as Folke from 'folke-core';
import { ValidableObservable, validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";

export default class IdentityPasswordViewModel {
    private services = get();
    public oldPassword = validableObservable("").addValidator(isRequired);
    public newPassword = validableObservable("").addValidator(isRequired);
    public confirmPassword = validableObservable("").addValidator(areSame(this.newPassword));
    public hasPassword = ko.pureComputed(() => authentication.default.account().hasPassword);
    public loading = this.services.loading;

    constructor (public params: Folke.Parameters<any>) {
    }

    public dispose() {
    }

    public submitChange = () => this.services.account.changePassword({ view: { confirmPassword: this.confirmPassword(), newPassword: this.newPassword(), oldPassword: this.oldPassword() } }).then(() => this.params.resolve && this.params.resolve());
    public submitSet = () => this.services.account.setPassword({ model: { newPassword: this.newPassword() } }).then(() => this.params.resolve && this.params.resolve());

    public isValid = ko.pureComputed(() => (this.hasPassword() || this.oldPassword.valid()) && this.newPassword.valid() && this.confirmPassword.valid());
}
