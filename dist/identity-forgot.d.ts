import { ForgotPasswordView, User } from './services';
import * as Folke from 'folke-core';
export default class IdentityForgotViewModel {
    parameters: Folke.Parameters<User>;
    form: ForgotPasswordView;
    constructor(parameters: Folke.Parameters<User>);
    dispose(): void;
    ask: () => void;
    login: () => PromiseLike<User>;
}
