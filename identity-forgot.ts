import ko = require("knockout");
import { get, ForgotPasswordView, User } from './services';
import authentication = require('./authentication');
import * as Folke from 'folke-core';
import { ValidableObservable, validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";

export default class IdentityForgotViewModel<TKey> {
    private services = get<TKey>();
    public email = validableObservable("").addValidator(isEmail).addValidator(isRequired);

    constructor(public parameters: Folke.Parameters<User<TKey>>) {
    }

    public dispose() {
    }

    public ask = () => {
        this.services.authentication.forgotPassword({ forgotPasswordView: { email: this.email() } }).then(() => Folke.default.showPopin('identity-reset', this.parameters));
    }

    public login = () => Folke.default.showPopin('identity-login', this.parameters);

    public isValid = ko.pureComputed(() => !this.services.loading() && this.email.valid());
}
