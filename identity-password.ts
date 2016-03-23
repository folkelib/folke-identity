import ko = require("knockout");
import services = require('services/services');
import authentication = require('./authentication');
import * as Folke from '../folke-core/folke';

export class IdentityPasswordViewModel {
    public formChange = new services.ChangePasswordView();
    public formSet = new services.SetPasswordView();
    public hasPassword = authentication.default.account().hasPassword;
    public loading = services.loading;

    constructor (public params: Folke.Parameters<any>) {
    }

    public dispose() {
    }

    public submitChange = () => services.account.changePassword({ view: this.formChange }).then(() => this.params.resolve());
    public submitSet = () => services.account.setPassword({ model: this.formSet }).then(() => this.params.resolve());
}

export var viewModel = IdentityPasswordViewModel;