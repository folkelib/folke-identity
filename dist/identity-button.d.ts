import { Identity } from './identity';
export default class IdentityButtonViewModel<TKey> implements JSX.ElementClass {
    props: {
        identity: Identity<TKey>;
    };
    render(): HTMLElement;
}
