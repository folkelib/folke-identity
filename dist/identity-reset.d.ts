import { ResetPasswordView } from './services';
import * as Folke from 'folke-core';
export default class IdentityResetViewModel {
    params: Folke.Parameters<any>;
    form: ResetPasswordView;
    constructor(params: Folke.Parameters<any>);
    dispose(): void;
    reset: () => Promise<void>;
}
