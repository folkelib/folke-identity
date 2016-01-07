/// <amd-dependency path="text!./identity-register.html" />
import ko = require("knockout");
import services = require('services/services');
import * as Authentication from './authentication';
import * as Folke from '../../folke-core/folke';
import * as ServiceHelpers from "bower_components/folke-ko-service-helpers/folke-ko-service-helpers"

export class IdentityRegisterViewModel {
    form = new services.RegisterView();
    loading = services.loading;

    constructor(public params: Folke.Parameters<Authentication.AccountView>) {
    }

    public login = () => Folke.default.showPopin('identity-login', this.params);

    public register = () => {
        services.authentication.register({ registerView: this.form }).then(view => {
            Authentication.default.hideEmailConfirmBar(true);
            Authentication.default.account(view);
            return view;
        }).then(view => this.params.resolve(view));
    }

    public dispose() {
    }

    public facebookLogin = () => {
        window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: 'Facebook', returnUrl: window.location.toString() }), 'oauth', 'dialog');
    }
}

export var viewModel = IdentityRegisterViewModel;