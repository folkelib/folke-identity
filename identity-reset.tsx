import * as ko from 'knockout';
import { validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { Identity } from './identity';

export default class IdentityResetViewModel<TKey> {
    private password = validableObservable("").addValidator(isRequired);
    private confirmPassword = validableObservable("").addValidator(isRequired).addValidator(areSame(this.password));
    private code = validableObservable("").addValidator(isRequired);
    private email = validableObservable("").addValidator(isEmail);
    private userId: string;
    
    private isValid = ko.pureComputed(() => !this.props.identity.services.loading() && this.password.valid() && this.code.valid() && this.confirmPassword.valid());

    constructor(public props: { id?: string, ["code*"]?: string, onReset: () => void, identity: Identity<TKey> }) {
        if (props.id) {
            this.userId = props.id;
        }

        const code = props['code*'];
        if (code) {
            this.code(code);
        }
    }

    public render() {
        return <section class="identity-popin popin">
        <header class="popin-header">
            {/* <popin-close-button></popin-close-button> */}
            <div>identity.resetPassword</div>
        </header>
        <section>
            <form data-bind="submit: reset">
                <header>identity.enterCodeTitle</header>
                <fieldset class="container">
                    { ko_ifnot(ko.pureComputed(() => !!this.userId), () => 
                    <fieldset class="large" data-bind="ifnot: userId">
                        <label>identity.email</label>
                        <input type="text" textInput={this.email} />
                    </fieldset>)}
                    <fieldset class="large">
                        <label>identity.code</label>
                        <input type="text" textInput={this.code} />
                    </fieldset>
                    <fieldset class="large">
                        <label>identity.password</label>
                        <input type="password" textInput={this.password} />
                    </fieldset>
                    <fieldset class="large">
                        <label>identity.confirmPassword</label>
                        <input type="password" textInput={this.confirmPassword} />
                    </fieldset>
    
                    <footer>
                        <button type="submit" enable={this.isValid}>identity.validate</button>
                    </footer>
                </fieldset>
            </form>
        </section>
    </section>
    }

    public dispose() {
    }

    public reset = () => this.props.identity.services.authentication.resetPassword({ resetPasswordView: { code: this.code(), userId: this.userId, confirmPassword: this.confirmPassword(), password: this.password() } }).then(() => this.props.onReset());
}
