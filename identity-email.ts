import ko = require("knockout");
import { services, SetEmailView } from './services';
import authentication = require('./authentication');
import * as Folke from 'folke-core';

export default class IdentityEmailViewModel {
    public form = services.factories.createSetEmailView({ email: "" });
    public loading = services.loading;
    
    constructor(public params: Folke.Parameters<any>) {
        this.form.email(authentication.default.account().email);
    }

    public dispose() {
    }

    public submit = () => services.account.setEmail({ model: this.form }).then(() => this.params.resolve && this.params.resolve());
}
