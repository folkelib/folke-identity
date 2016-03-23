import ko = require("knockout");
import services = require('services/services');
import authentication = require('./authentication');
import * as Folke from '../folke-core/folke';
import * as ServiceHelpers from "../folke-ko-service-helpers/folke-ko-service-helpers"

export class IdentityLoginViewModel {
    form = new services.LoginView();
    providers = ko.observableArray<string>();
    loading = services.loading;
    
    constructor(public parameters: Folke.Parameters<authentication.AccountView>) {
        services.authentication.getExternalAuthenticationProviders({}).then(providers => this.providers(providers));
    }

    public login = () => {
        services.authentication.login({ loginView: this.form }).then(loginResult => {
            if (loginResult.status() === services.LoginStatusEnum.Success) {
                authentication.default.updateMe().then(() => this.parameters.resolve());
            }            
        });
    }

    public forgotPassword = () => Folke.default.showPopin<authentication.AccountView>('identity-forgot', this.parameters);
    public register = () => Folke.default.showPopin<authentication.AccountView>('identity-register', this.parameters);

    public dispose() {
    }

    public facebookLogin = () => {
        window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: 'Facebook', returnUrl: window.location.toString() }), 'oauth', 'dialog');
    }
}

export var viewModel = IdentityLoginViewModel;
