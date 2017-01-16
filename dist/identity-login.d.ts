/// <reference types="knockout" />
import { AuthenticationDescription, User } from './services';
import * as Folke from 'folke-core';
import { ValidableObservable } from "folke-ko-validation";
export default class IdentityLoginViewModel<TKey> {
    parameters: Folke.Parameters<User<TKey>>;
    private services;
    email: ValidableObservable<string>;
    password: ValidableObservable<string>;
    rememberMe: KnockoutObservable<boolean>;
    providers: KnockoutObservableArray<AuthenticationDescription>;
    loading: () => boolean;
    constructor(parameters: Folke.Parameters<User<TKey>>);
    login: () => void;
    forgotPassword: () => PromiseLike<User<TKey>>;
    register: () => PromiseLike<User<TKey>>;
    dispose(): void;
    facebookLogin: (provider: AuthenticationDescription) => void;
    isValid: KnockoutComputed<boolean>;
}
