import { ForgotPasswordView, UserViewModel } from './services';
import * as Folke from 'folke-core';
export default class IdentityForgotViewModel {
    parameters: Folke.Parameters<UserViewModel>;
    form: ForgotPasswordView;
    constructor(parameters: Folke.Parameters<UserViewModel>);
    dispose(): void;
    ask: () => void;
    login: () => Promise<UserViewModel>;
}
