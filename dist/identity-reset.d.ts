/// <reference types="knockout" />
import * as Folke from 'folke-core';
import { ValidableObservable } from "folke-ko-validation";
export default class IdentityResetViewModel<TKey> {
    params: Folke.Parameters<any>;
    private services;
    password: ValidableObservable<string>;
    confirmPassword: ValidableObservable<string>;
    code: ValidableObservable<string>;
    private userId;
    isValid: KnockoutComputed<boolean>;
    constructor(params: Folke.Parameters<any>);
    dispose(): void;
    reset: () => Promise<void | undefined>;
}
