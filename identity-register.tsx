import * as ko from 'knockout';
import { validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { Identity } from './identity';
import { getQueryString } from 'folke-service-helpers';

export default class IdentityRegisterViewModel<TKey> {
    private email = validableObservable("").addValidator(isEmail).addValidator(isRequired);
    private password = validableObservable("").addValidator(isRequired);
    private confirmPassword = validableObservable("").addValidator(areSame(this.password));
    private isValid = ko.pureComputed(() => !this.props.identity.loading() && this.email.valid() && this.password.valid() && this.confirmPassword.valid());


    constructor(public props: { identity: Identity<TKey>, onRegister: () => void }) {
    }

    public render() {
        return <section class="identity-popin popin">
        <header>
            {/* <popin-close-button></popin-close-button> */}
            <div>identity.createAccounttitle</div>
        </header>
        <section>
            <form submit={this.register}>
                <fieldset class="large">
                    <label>identity.email</label>
                    <input type="text" textInput={this.email} validate={this.email}/>
                </fieldset>
                <fieldset class="large">
                    <label>identity.password</label>
                    <input type="password" textInput={this.password} validate={this.password}/>
                </fieldset>
                <fieldset class="large">
                    <label>identity.confirmPassword</label>
                    <input type="password" textInput={this.confirmPassword} validate={this.confirmPassword}/>
                </fieldset>
    
                <div>
                    <button type="submit" class="fit button" enable={this.isValid}>identity.signupButton</button>
                </div>
            </form>
        </section>
    
        <div class="separator">identity.or</div>
        <section class="social">
            <button class="button fit" click={this.facebookLogin}><span class="fa fa-facebook"></span> identity.signupSocial</button>
        </section>
    
        <footer>
            identity.alreadyMember <a href="" click={this.login}>identity.loginButton</a>
        </footer>
    </section>;
    
    }

    public login = () => this.props.identity.goToLogin(this.props.onRegister) ;

    public register = () => {
        this.props.identity.services.authentication.register({ registerView: { email: this.email(), password: this.password(), confirmPassword: this.confirmPassword() } }).then(view => {
            this.props.identity.hideEmailConfirmBar(true);
            this.props.identity.account(view);
            return view;
        }).then(view => this.props.onRegister());
    }

    public dispose() {
    }

    public facebookLogin = () => {
        window.open('/api/authentication/external-login' + getQueryString({ provider: 'Facebook', returnUrl: window.location.toString() }), 'oauth', 'dialog');
    }
}
