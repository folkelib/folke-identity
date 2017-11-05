import { Identity } from './identity';
export default class IdentityRegisterViewModel<TKey> {
    props: {
        identity: Identity<TKey>;
        onRegister: () => void;
    };
    private email;
    private password;
    private confirmPassword;
    private isValid;
    constructor(props: {
        identity: Identity<TKey>;
        onRegister: () => void;
    });
    render(): HTMLElement;
    login: () => void;
    register: () => void;
    dispose(): void;
    facebookLogin: () => void;
}
