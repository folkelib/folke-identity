import ko = require("knockout");
import { ChangePasswordView, SetPasswordView } from './services';
import * as Folke from 'folke-core';
export default class IdentityPasswordViewModel {
    params: Folke.Parameters<any>;
    formChange: ChangePasswordView;
    formSet: SetPasswordView;
    hasPassword: ko.Observable<boolean>;
    loading: () => boolean;
    constructor(params: Folke.Parameters<any>);
    dispose(): void;
    submitChange: () => Promise<void>;
    submitSet: () => Promise<void>;
}
