import ko = require("knockout");
import { validableObservable, isEmail, isRequired } from 'folke-ko-validation';
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { Identity } from "./identity";

export default class IdentityEmailViewModel<TKey> {
    props: { identity: Identity<TKey>, onSubmit: () => void }
    private email = validableObservable("").addValidator(isEmail).addValidator(isRequired)

    render() {
        this.email(this.props.identity.account().email);
        return <section class="identity-popin popin">
            <header>
                {/* <popin-close-button></popin-close-button> */}
                <div>Edit e-mail</div>
            </header>
        
            <section>
                <form submit={this.submit}>
                    <fieldset class="large">
                        <label>E-mail</label>
                        <input type="text" textInput={this.email}/>
                    </fieldset>
                    <fieldset>
                        <button class="button fit" type="submit" enable={this.isValid}>Edit</button>
                    </fieldset>
                </form>
            </section>
            <footer>
                <a href="#identity-password">Change password</a>
            </footer>
        </section>;
    }

    public dispose() {
    }

    public isValid = ko.pureComputed(() => this.email.valid() && !this.props.identity.services.loading());

    public submit = () => this.props.identity.services.account.setEmail({ model: { email: this.email() } }).then(() => this.props.onSubmit());
}
