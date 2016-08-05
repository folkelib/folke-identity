import { RegisterView, UserViewModel } from './services';
import * as Folke from 'folke-core';
export default class IdentityRegisterViewModel {
    params: Folke.Parameters<UserViewModel>;
    form: RegisterView;
    loading: () => boolean;
    constructor(params: Folke.Parameters<UserViewModel>);
    login: () => Promise<UserViewModel>;
    register: () => void;
    dispose(): void;
    facebookLogin: () => void;
}
