/// <amd-dependency path="text!./identity-forgot.html" />
import ko = require("knockout");
import services = require('services/services');
import authentication = require('./authentication');
import * as Folke from '../folke-core/folke';

export class viewModel {
    public form = new services.ForgotPasswordView();

    constructor(public parameters: Folke.Parameters<authentication.AccountView>) {
    }

    public dispose() {
    }

    public ask = () => {
        services.authentication.forgotPassword({ forgotPasswordView: this.form }).then(() => Folke.default.showPopin('identity-reset', this.parameters));
    }

    public login = () => Folke.default.showPopin('identity-login', this.parameters);
}
