import { RegisterView, User } from './services';
import * as Folke from 'folke-core';
export default class IdentityRegisterViewModel {
    params: Folke.Parameters<User>;
    form: RegisterView;
    loading: () => boolean;
    constructor(params: Folke.Parameters<User>);
    login: () => PromiseLike<User>;
    register: () => void;
    dispose(): void;
    facebookLogin: () => void;
}
