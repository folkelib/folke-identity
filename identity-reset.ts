import ko = require("knockout");
import { get, ResetPasswordView } from './services';
import * as Authentication from './authentication';
import * as Folke from 'folke-core';
import { ValidableObservable, validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";

export default class IdentityResetViewModel<TKey> {
    private services = get<TKey>();
    public password = validableObservable("").addValidator(isRequired);
    public confirmPassword = validableObservable("").addValidator(isRequired).addValidator(areSame(this.password));
    public code = validableObservable("").addValidator(isRequired);
    private userId: string;
    
    public isValid = ko.pureComputed(() => !this.services.loading() && this.password.valid() && this.code.valid() && this.confirmPassword.valid());

    constructor(public params: Folke.Parameters<any>) {
        if (params['id']) {
            this.userId = params['id'];
        }

        if (params['code*']) {
            this.code(params['code*']);
        }
    }

    public dispose() {
    }

    public reset = () => this.services.authentication.resetPassword({ resetPasswordView: { code: this.code(), userId: this.userId, confirmPassword: this.confirmPassword(), password: this.password() } }).then(() => this.params.resolve && this.params.resolve());
}
