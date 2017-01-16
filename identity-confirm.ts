import ko = require("knockout");
import { get } from './services';
import * as Authentication from './authentication';
import * as Folke from 'folke-core';

export default class ConfirmViewModel<TKey> {
    private services = get<TKey>();
    constructor(params: Folke.Parameters<any>) {
        var accountId: number = params['id'];
        var code: string = params['code*'];
        this.services.authentication.confirmEmail({ userId: accountId, code: code }).then(() => {
            Authentication.default.account().emailConfirmed = true;
            params.resolve && params.resolve();
        }, error => params.reject && params.reject(error));
    }
    
    public dispose() { }
}
