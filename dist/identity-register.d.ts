/// <reference types="knockout" />
import { User } from './services';
import * as Folke from 'folke-core';
import { ValidableObservable } from "folke-ko-validation";
export default class IdentityRegisterViewModel<TKey> {
    params: Folke.Parameters<User<TKey>>;
    private services;
    email: ValidableObservable<string>;
    password: ValidableObservable<string>;
    confirmPassword: ValidableObservable<string>;
    isValid: KnockoutComputed<boolean>;
    loading: () => boolean;
    constructor(params: Folke.Parameters<User<TKey>>);
    login: () => PromiseLike<User<TKey>>;
    register: () => void;
    dispose(): void;
    facebookLogin: () => void;
}
