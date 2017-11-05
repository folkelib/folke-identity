/// <reference types="knockout" />
import { AuthenticationScheme } from './services';
import { Identity } from './identity';
import { ValidableObservable } from "folke-ko-validation";
export declare class IdentityLoginViewModel<TKey> {
    props: {
        identity: Identity<TKey>;
        onLogin: () => void;
    };
    email: ValidableObservable<string>;
    password: ValidableObservable<string>;
    rememberMe: KnockoutObservable<boolean>;
    providers: KnockoutObservableArray<AuthenticationScheme>;
    constructor(props: {
        identity: Identity<TKey>;
        onLogin: () => void;
    });
    render(): HTMLElement;
    login: () => void;
    forgotPassword: () => void;
    register: () => void;
    dispose(): void;
    facebookLogin: (provider: AuthenticationScheme) => void;
    isValid: KnockoutComputed<boolean>;
}
