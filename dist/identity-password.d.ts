/// <reference types="knockout" />
import * as Folke from 'folke-core';
import { ValidableObservable } from "folke-ko-validation";
export default class IdentityPasswordViewModel {
    params: Folke.Parameters<any>;
    private services;
    oldPassword: ValidableObservable<string>;
    newPassword: ValidableObservable<string>;
    confirmPassword: ValidableObservable<string>;
    hasPassword: KnockoutComputed<boolean>;
    loading: () => boolean;
    constructor(params: Folke.Parameters<any>);
    dispose(): void;
    submitChange: () => Promise<void | undefined>;
    submitSet: () => Promise<void | undefined>;
    isValid: KnockoutComputed<boolean>;
}
