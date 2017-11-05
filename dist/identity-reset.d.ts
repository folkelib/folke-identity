import { Identity } from './identity';
export default class IdentityResetViewModel<TKey> {
    props: {
        id?: string;
        ["code*"]?: string;
        onReset: () => void;
        identity: Identity<TKey>;
    };
    private password;
    private confirmPassword;
    private code;
    private email;
    private userId;
    private isValid;
    constructor(props: {
        id?: string;
        ["code*"]?: string;
        onReset: () => void;
        identity: Identity<TKey>;
    });
    render(): HTMLElement;
    dispose(): void;
    reset: () => Promise<void>;
}
