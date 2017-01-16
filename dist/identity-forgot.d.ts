/// <reference types="knockout" />
import { User } from './services';
import * as Folke from 'folke-core';
import { ValidableObservable } from "folke-ko-validation";
export default class IdentityForgotViewModel<TKey> {
    parameters: Folke.Parameters<User<TKey>>;
    private services;
    email: ValidableObservable<string>;
    constructor(parameters: Folke.Parameters<User<TKey>>);
    dispose(): void;
    ask: () => void;
    login: () => PromiseLike<User<TKey>>;
    isValid: KnockoutComputed<boolean>;
}
