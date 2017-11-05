import { Identity } from './identity';
export default class ConfirmViewModel<TKey> {
    private props;
    constructor(props: {
        id: TKey;
        ["code*"]: string;
        identity: Identity<TKey>;
        onConfirm: () => void;
    });
    render(): HTMLElement;
}
