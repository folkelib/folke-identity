import { Identity } from './identity';
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";

export default class ConfirmViewModel<TKey> {
    constructor(private props: { id: TKey, ["code*"]: string, identity: Identity<TKey>, onConfirm: () => void }) {
        var accountId = props.id;
        var code: string = props['code*'];
        props.identity.services.authentication.confirmEmail({ userId: accountId, code: code }).then(() => {
            this.props.identity.account().emailConfirmed = true;
            this.props.onConfirm();
        });
    }
    
    public render() { 
        return <div></div>;
    }
}
