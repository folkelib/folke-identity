import ko = require("knockout");
import { get, AuthenticationDescription, LoginView, LoginStatusEnum, User } from './services';
import authentication = require('./authentication');
import * as Folke from 'folke-core';
import * as ServiceHelpers from "folke-ko-service-helpers";
import { ValidableObservable, validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";

export default class IdentityLoginViewModel<TKey> {
    private services = get<TKey>();
    email = validableObservable("").addValidator(isRequired).addValidator(isEmail);
    password = validableObservable("").addValidator(isRequired);
    rememberMe = ko.observable(false);
    providers = ko.observableArray<AuthenticationDescription>();
    loading = this.services.loading;
    
    constructor(public parameters: Folke.Parameters<User<TKey>>) {
        this.services.authentication.getExternalAuthenticationProviders({}).then(providers => this.providers(providers));
    }

    public login = () => {
        this.services.authentication.login({ loginView: { email: this.email(), password: this.password(), rememberMe: this.rememberMe() } }).then(loginResult => {
            if (loginResult.status === LoginStatusEnum.Success) {
                authentication.default.updateMe().then(() => this.parameters.resolve && this.parameters.resolve());
            }            
        });
    }

    public forgotPassword = () => Folke.default.showPopin<User<TKey>>('identity-forgot', this.parameters);
    public register = () => Folke.default.showPopin<User<TKey>>('identity-register', this.parameters);

    public dispose() {
    }

    public facebookLogin = (provider: AuthenticationDescription) => {
        window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: provider.authenticationScheme, returnUrl: window.location.toString() }), 'oauth', 'dialog');
    }

    public isValid = ko.pureComputed(() => !this.services.loading() && this.email.valid() && this.password.valid());
}
