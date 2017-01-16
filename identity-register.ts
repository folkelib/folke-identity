import ko = require("knockout");
import { get, RegisterView, User } from './services';
import * as Authentication from './authentication';
import * as Folke from 'folke-core';
import * as ServiceHelpers from "folke-ko-service-helpers"
import { ValidableObservable, validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";

export default class IdentityRegisterViewModel<TKey> {
    private services = get<TKey>();
    email = validableObservable("").addValidator(isEmail).addValidator(isRequired);
    password = validableObservable("").addValidator(isRequired);
    confirmPassword = validableObservable("").addValidator(areSame(this.password));
    isValid = ko.pureComputed(() => !this.services.loading() && this.email.valid() && this.password.valid() && this.confirmPassword.valid());

    loading = this.services.loading;

    constructor(public params: Folke.Parameters<User<TKey>>) {
    }

    public login = () => Folke.default.showPopin('identity-login', this.params);

    public register = () => {
        this.services.authentication.register({ registerView: { email: this.email(), password: this.password(), confirmPassword: this.confirmPassword() } }).then(view => {
            Authentication.default.hideEmailConfirmBar(true);
            Authentication.default.account(view);
            return view;
        }).then(view => this.params.resolve && this.params.resolve(view));
    }

    public dispose() {
    }

    public facebookLogin = () => {
        window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: 'Facebook', returnUrl: window.location.toString() }), 'oauth', 'dialog');
    }
}
