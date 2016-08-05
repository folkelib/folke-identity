import ko = require("knockout");
import { AuthenticationDescription, LoginView, UserViewModel } from './services';
import * as Folke from 'folke-core';
export default class IdentityLoginViewModel {
    parameters: Folke.Parameters<UserViewModel>;
    form: LoginView;
    providers: ko.ObservableArray<AuthenticationDescription>;
    loading: () => boolean;
    constructor(parameters: Folke.Parameters<UserViewModel>);
    login: () => void;
    forgotPassword: () => Promise<UserViewModel>;
    register: () => Promise<UserViewModel>;
    dispose(): void;
    facebookLogin: (provider: AuthenticationDescription) => void;
}
