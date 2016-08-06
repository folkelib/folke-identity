import ko = require("knockout");
import { services, RegisterView, User } from './services';
import * as Authentication from './authentication';
import * as Folke from 'folke-core';
import * as ServiceHelpers from "folke-ko-service-helpers"

export default class IdentityRegisterViewModel {
    form = services.factories.createRegisterView({ email: "", password: "" });
    loading = services.loading;

    constructor(public params: Folke.Parameters<User>) {
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
