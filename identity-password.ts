import ko = require("knockout");
import { services, ChangePasswordView, SetPasswordView } from './services';
import authentication = require('./authentication');
import * as Folke from 'folke-core';

export default class IdentityPasswordViewModel {
    public formChange = services.factories.createChangePasswordView();
    public formSet = services.factories.createSetPasswordView();
    public hasPassword = authentication.default.account().hasPassword;
    public loading = services.loading;

    constructor (public params: Folke.Parameters<any>) {
    }

    public dispose() {
    }

    public submitChange = () => services.account.changePassword({ view: this.formChange }).then(() => this.params.resolve());
    public submitSet = () => services.account.setPassword({ model: this.formSet }).then(() => this.params.resolve());
}
