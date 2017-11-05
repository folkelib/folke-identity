import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { Identity } from './identity';
export default class IdentityButtonViewModel<TKey> implements JSX.ElementClass {
    props: { identity: Identity<TKey>  }

    render() {
        const logged = this.props.identity.logged;
        const account = this.props.identity.account;
        const menu = this.props.identity.menu;
        if (!menu) return <div></div>;

        const login = () => this.props.identity.goToLogin(() =>this.props.identity.app.hidePopin());
        const toggle = () => menu.collapsed(!menu.collapsed());
        return <div>{ ko_if(logged, () => 
                <div>
                    <button click={toggle}>{account().userName}</button>
                    { ko_ifnot(menu.collapsed, () =>
                        <ul> {
                            ko_foreach(menu.menu, m => 
                                <li visible={m.visible}></li>)}
                        </ul>)}
                </div>) }
            { ko_ifnot(logged, () =>
                <button click={login}>Login</button>
        )} </div>;
    }
}
