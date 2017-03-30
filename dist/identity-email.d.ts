/// <reference types="knockout" />
import { ValidableObservable } from 'folke-ko-validation';
import * as Folke from 'folke-core';
export default class IdentityEmailViewModel<TKey> {
    params: Folke.Parameters<any>;
    private services;
    email: ValidableObservable<string>;
    loading: () => boolean;
    constructor(params: Folke.Parameters<any>);
    dispose(): void;
    isValid: KnockoutComputed<boolean>;
    submit: () => Promise<void | undefined>;
}
