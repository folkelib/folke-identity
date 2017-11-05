/// <reference types="knockout" />
import { ValidableObservable } from "folke-ko-validation";
import { Identity } from './identity';
export default class IdentityPasswordViewModel<TKey> {
    private props;
    constructor(props: {
        identity: Identity<TKey>;
        onChanged: () => void;
    });
    oldPassword: ValidableObservable<string>;
    newPassword: ValidableObservable<string>;
    confirmPassword: ValidableObservable<string>;
    hasPassword: KnockoutComputed<boolean>;
    loading: () => boolean;
    render(): HTMLElement;
    dispose(): void;
    submitChange: () => Promise<void>;
    submitSet: () => Promise<void>;
    isValid: KnockoutComputed<boolean>;
}
