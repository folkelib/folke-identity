/// <amd-dependency path="text!./identity-email.html" />
import ko = require("knockout");
import services = require('services/services');
import authentication = require('./authentication');
import * as Folke from '../../folke-core/folke';

export class IdentityEmailViewModel {
    public form = new services.SetEmailView();
    public loading = services.loading;
    
    constructor(public params: Folke.Parameters<any>) {
        this.form.email(authentication.default.account().email());
    }

    public dispose() {
    }

    public submit = () => services.account.setEmail({ model: this.form }).then(() => this.params.resolve());
}

export var viewModel = IdentityEmailViewModel;