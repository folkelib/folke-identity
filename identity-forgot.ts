import ko = require("knockout");
import { services, ForgotPasswordView, User } from './services';
import authentication = require('./authentication');
import * as Folke from 'folke-core';

export default class IdentityForgotViewModel {
    public form = services.factories.createForgotPasswordView({ email: "" });

    constructor(public parameters: Folke.Parameters<User>) {
    }

    public dispose() {
    }

    public ask = () => {
        services.authentication.forgotPassword({ forgotPasswordView: this.form }).then(() => Folke.default.showPopin('identity-reset', this.parameters));
    }

    public login = () => Folke.default.showPopin('identity-login', this.parameters);
}
