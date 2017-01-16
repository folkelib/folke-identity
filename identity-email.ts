import ko = require("knockout");
import { get as services, SetEmailView } from './services';
import authentication = require('./authentication');
import { validableObservable, isEmail, isRequired, ValidableObservable } from 'folke-ko-validation';
import * as Folke from 'folke-core';

export default class IdentityEmailViewModel<TKey> {
    private services = services<TKey>();
    public email = validableObservable("").addValidator(isEmail).addValidator(isRequired)
    public loading = this.services.loading;
    
    constructor(public params: Folke.Parameters<any>) {
        this.email(authentication.default.account().email);
    }

    public dispose() {
    }

    public isValid = ko.pureComputed(() => this.email.valid() && !this.loading());

    public submit = () => this.services.account.setEmail({ model: { email: this.email() } }).then(() => this.params.resolve && this.params.resolve());
}
