/// <amd-dependency path="text!./account-confirm.html" />
import ko = require("knockout");
export var template: string = require("text!./account-confirm.html");
import * as services from 'services/services';
import * as Authentication from './authentication';
import * as Folke from '../../folke-core/folke';

export class viewModel {
    constructor(params: Folke.Parameters<any>) {
        var accountId: number = params['id'];
        var code: string = params['code*'];
        services.authentication.confirmEmail({ userId: accountId, code: code }).then(() => {
            Authentication.default.account().emailConfirmed(true);
            params.resolve();
        }, error => params.reject(error));
    }
    
    public dispose() { }
}
