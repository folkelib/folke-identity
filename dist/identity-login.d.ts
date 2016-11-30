/// <reference types="knockout" />
import { AuthenticationDescription, LoginView, User } from './services';
import * as Folke from 'folke-core';
export default class IdentityLoginViewModel {
    parameters: Folke.Parameters<User>;
    form: LoginView;
    providers: KnockoutObservableArray<AuthenticationDescription>;
    loading: () => boolean;
    constructor(parameters: Folke.Parameters<User>);
    login: () => void;
    forgotPassword: () => PromiseLike<User>;
    register: () => PromiseLike<User>;
    dispose(): void;
    facebookLogin: (provider: AuthenticationDescription) => void;
}
