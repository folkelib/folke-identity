/// <amd-dependency path="text!./account-reset.html" />
import ko = require("knockout");
import services = require('services/services');
import * as Authentication from './authentication';
import * as Folke from '../folke-core/folke';

export class IdentityResetViewModel {
    public form = new services.ResetPasswordView();
    
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

export var viewModel = IdentityResetViewModel;