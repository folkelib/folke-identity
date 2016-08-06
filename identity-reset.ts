import ko = require("knockout");
import { services, ResetPasswordView } from './services';
import * as Authentication from './authentication';
import * as Folke from 'folke-core';

export default class IdentityResetViewModel {
    public form = services.factories.createResetPasswordView({ password: "" });
    
    constructor(public params: Folke.Parameters<any>) {
        if (params['id'])
        {
            this.form.userId(params['id']);
        }
        if (params['code*'])
        {
            this.form.code(params['code*']);
        }
    }

    public dispose() {
    }

    public reset = () => services.authentication.resetPassword({ resetPasswordView: this.form }).then(() => this.params.resolve());
}
