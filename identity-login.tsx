import ko = require("knockout");
import { AuthenticationScheme, LoginView, LoginStatusEnum, User } from './services';
import { Identity } from './identity';
import { Application } from 'folke-core';
import * as ServiceHelpers from "folke-service-helpers";
import { ValidableObservable, validableObservable, isEmail, isRequired, areSame } from "folke-ko-validation";
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { IdentityForgotViewModel} from "./identity-forgot";
import IdentityRegisterViewModel from "./identity-register";
export class IdentityLoginViewModel<TKey> {
    email = validableObservable("").addValidator(isRequired).addValidator(isEmail);
    password = validableObservable("").addValidator(isRequired);
    rememberMe = ko.observable(false);
    providers = ko.observableArray<AuthenticationScheme>();
    
    constructor(public props: { identity: Identity<TKey>, onLogin: () => void }) {
        this.props.identity.services.authentication.getExternalAuthenticationProviders({}).then(providers => this.providers(providers));
    }

    render() {
        return <section class="identity-popin popin">
        <header>
            {/* <popin-close-button></popin-close-button> */}
            <div>identity.loginTitle</div>
        </header>
        <section>
            <form submit={this.login}>
                <fieldset class="large">
                    <label>identity.email</label>
                    <input type="text" textInput={this.email} validate={this.email}/>
                </fieldset>
                <fieldset class="large">
                    <label>identity.password</label>
                    <input type="password" textInput={this.password} validate={this.password}/>
                </fieldset>
                <fieldset>
                    <label><input type="checkbox" checked={this.rememberMe}/>identity.rememberMe </label>
                </fieldset>
                <fieldset class="pull-right">
                    <a href="#" click={this.forgotPassword} class="hover">identity.forgotPassword</a>
                </fieldset>
                <footer>
                    <button class="button fit" type="submit" enable={this.isValid}>identity.loginButton</button>
                </footer>
            </form>
        </section>
        {ko_if(ko.pureComputed(() => this.providers().length > 0), () => 
        <div>
        <div class="separator">identity.or</div>
    
        <section class="social">
            { ko_foreach(this.providers, p => 
            <button class="button fit" click={() => this.facebookLogin(p)}><span class="fa fa-facebook"></span> identity.connectFB, displayName</button>
            )}
        </section>
        </div>)}
        <footer>
            identity.notAmember <a href="" click={this.register}>identity.registerNow</a>
        </footer>
    </section>
    }

    private loading = ko.observable(false);

    public login = () => {
        this.loading(true);
        this.props.identity.services.authentication.login({ loginView: { email: this.email(), password: this.password(), rememberMe: this.rememberMe() } }).then(loginResult => {
            this.loading(false);
            if (loginResult.status === LoginStatusEnum.Success) {
                this.props.identity.updateMe().then(() => this.props.onLogin());
            }            
        });
    }

    public forgotPassword = () => this.props.identity.app.showPopin(<IdentityForgotViewModel identity={this.props.identity} onConfirm={this.props.onLogin} />);
    public register = () => this.props.identity.app.showPopin(<IdentityRegisterViewModel identity={this.props.identity} onRegister={this.props.onLogin} />);

    public dispose() {
    }

    public facebookLogin = (provider: AuthenticationScheme) => {
        window.open('/api/authentication/external-login' + ServiceHelpers.getQueryString({ provider: provider.name, returnUrl: window.location.toString() }), 'oauth', 'dialog');
    }

    public isValid = ko.pureComputed(() => !this.props.identity.loading() && this.email.valid() && this.password.valid());
}
