/// <reference types="knockout" />
import { Identity } from "./identity";
export default class IdentityEmailViewModel<TKey> {
    props: {
        identity: Identity<TKey>;
        onSubmit: () => void;
    };
    private email;
    render(): HTMLElement;
    dispose(): void;
    isValid: KnockoutComputed<boolean>;
    submit: () => Promise<void>;
}
