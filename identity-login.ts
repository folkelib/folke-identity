import ko = require("knockout");
import { services, AuthenticationDescription, LoginView, LoginStatusEnum, UserViewModel } from './services';
import authentication = require('./authentication');
import * as Folke from 'folke-core';
import * as ServiceHelpers from "folke-ko-service-helpers";

export default class IdentityLoginViewModel {
    form = services.factories.createLoginView();
    providers = ko.observableArray<AuthenticationDescription>();
    loading = services.loading;
    
    constructor(public parameters: Folke.Parameters<UserViewModel>) {
        services.authentication.getExternalAuthenticationProviders({}).then(providers => this.providers(providers));
    }

    public login = () => {
        services.authentication.login({ loginView: this.form }).then(loginResult => {
            if (loginResult.status() === LoginStatusEnum.Success) {
                authentication.default.updateMe().then(() => this.parameters.resolve());
            }            
        });
    }

    public forgotPassword = () => Folke.default.showPopin<UserViewModel>('identity-forgot', this.parameters);
    public register = () => Folke.default.showPopin<UserViewModel>('identity-register', this.parameters);

    public dispose() {
    }

    public facebookLogin = (provider: AuthenticationDescription) => {
        window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: provider.authenticationScheme(), returnUrl: window.location.toString() }), 'oauth', 'dialog');
    }
}
