import { get as getServices, User } from './services';
import ko = require('knockout');
import Folke from 'folke-core';

export class Authentication<TKey> {
    private services = getServices<TKey>();
    public account = ko.observable<User<TKey>>();
    public hideEmailConfirmBar = ko.observable(false);
    public roles = ko.observableArray<string>();

    public rolesLoaded = ko.observable<boolean>(null);
    public accountLoaded = ko.pureComputed(() => this.account());

    public logged = ko.computed(() => this.account() && this.account().logged);

    public updateMe() {
        this.updateRoles();
        return this.services.account.getMe({}).then(account => {
            this.account(account);
            return account;
        });
    }

    public logout = () => {
        return this.services.authentication.logOff({}).then(() => this.updateMe());
    }
    
    public getLogged() {
        return this.account.whenNotNull().then(account => account.logged);
    }

    public updateRoles() {
        this.rolesLoaded(null);
        return this.services.account.getUserRoles({}).then(roles => {
            this.roles(roles);
            this.rolesLoaded(true);
            return roles;
        });
    }

    public roleObservable(roleName: string) {
        return ko.pureComputed(() => this.hasRole(roleName));
    }

    public hasRole(roleName: string) {
        return this.roles().indexOf(roleName) >= 0;
    }

    public whenHasRole(roleName: string) {
        return this.rolesLoaded.whenNotNull().then(() => this.hasRole(roleName));
    }

    public whenLogged() {
        return this.getLogged().then(logged => {
            if (logged) return Promise.resolve(this.account());
            return Folke.showPopin<any>('identity-login');
        })
    }

    public addLoggedRoute(route: string, viewId: string) {
        Folke.addRoute(route, parameters => this.whenLogged().then(x => Folke.goToView(viewId, parameters)));
    }

    public addRoleRoute(route: string, role: string, viewId: string) {
        Folke.addRoute(route, parameters => this.whenLogged().then(x => this.whenHasRole(role))
            .then(hasRole => {
                if (hasRole) {
                    Folke.goToView(viewId, parameters);
                }
                else {
                    Folke.hidePopin();
                    console.error(`Unauthorized access. Need role ${role}`);
                }
            }));
    }

    public message(message: string) {
        switch (message) {
            case "success":
                this.updateMe();
                break;
            case "lockedout":
                break;
            case "requires-verification":
                break;
            case "failure":
                break;
        }
    }
}

export default new Authentication();