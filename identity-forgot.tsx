import * as ko from "knockout";
import { validableObservable, isEmail, isRequired } from "folke-ko-validation";
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { Identity } from "./identity";
import IdentityResetViewModel from "./identity-reset";

export class IdentityForgotViewModel<TKey> {
    constructor(public props: { identity: Identity<TKey>, onConfirm: () => void }) {}
    private email = validableObservable("").addValidator(isEmail).addValidator(isRequired);

    render() {
        return <section class="identity-popin popin">
            <header>
                {/* <popin-close-button></popin-close-button> */}
                <div>identity.accountForgot</div>
            </header>
            <section>
                <form submit={this.ask}>
                    <div>identity.accountForgotSubtitle</div>
                    <fieldset class="large">
                        <label>identity.email</label>
                        <input type="text" textInput={this.email}/>
                    </fieldset>
                    <button class="button purple fit" enable={this.isValid} type="submit">identity.submit</button>
                </form>
            </section>
        
            <footer>
                identity.backTo <a data-bind="click: login" href="">identity.signin</a>
            </footer>
        </section>;
    }

    public dispose() {
    }

    public ask = () => {
        this.props.identity.services.authentication.forgotPassword({ forgotPasswordView: { email: this.email() } }).then(() => this.props.identity.app.showPopin(<IdentityResetViewModel identity={this.props.identity} onReset={this.props.onConfirm} />));
    }

    public login = () => this.props.identity.goToLogin(this.props.onConfirm);

    public isValid = ko.pureComputed(() => !this.props.identity.services.loading() && this.email.valid());
}
