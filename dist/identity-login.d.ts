import ko = require("knockout");
import { AuthenticationDescription, LoginView, User } from './services';
import * as Folke from 'folke-core';
export default class IdentityLoginViewModel {
    parameters: Folke.Parameters<User>;
    form: LoginView;
    providers: ko.ObservableArray<AuthenticationDescription>;
    loading: () => boolean;
    constructor(parameters: Folke.Parameters<User>);
    login: () => void;
    forgotPassword: () => Promise<User>;
    register: () => Promise<User>;
    dispose(): void;
    facebookLogin: (provider: AuthenticationDescription) => void;
}
