/// <reference types="knockout" />
import { Identity } from "./identity";
export declare class IdentityForgotViewModel<TKey> {
    props: {
        identity: Identity<TKey>;
        onConfirm: () => void;
    };
    constructor(props: {
        identity: Identity<TKey>;
        onConfirm: () => void;
    });
    private email;
    render(): HTMLElement;
    dispose(): void;
    ask: () => void;
    login: () => void;
    isValid: KnockoutComputed<boolean>;
}
