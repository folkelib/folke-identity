﻿/// <amd-dependency path="../folke-ko-promise/folke-ko-promise" />
import services = require('services/services');
import ko = require('knockout');
import Folke from '../folke-core/folke';

export interface AccountView {
    changed: KnockoutComputed<boolean>;

    userName: KnockoutObservable<string>;
    logged: KnockoutObservable<boolean>;
    emailConfirmed: KnockoutObservable<boolean>;
    email:KnockoutObservable<string>;
    id: number;
    hasPassword:KnockoutObservable<boolean>;
}

export class Authentication {
    public account = ko.observable<AccountView>();
    public hideEmailConfirmBar = ko.observable(false);
    public roles = ko.observableArray<string>();

    public constructor() {
        this.updateMe();
     }

    public rolesLoaded = ko.observable<boolean>(null);
    public accountLoaded = ko.pureComputed(() => this.account());

    public logged = ko.computed(() => this.account() && this.account().logged());

    public updateMe() {
        this.updateRoles();
        return services.account.getMe({}).then(account => {
            this.account(account);
            return account;
        });
    }

    public logout = () => {
        return services.authentication.logOff({}).then(() => this.updateMe());
    }
    
    public getLogged() {
        return this.account.whenNotNull().then(account => account.logged());
    }

    public updateRoles() {
        return services.account.getUserRoles({}).then(roles => {
            this.roles(roles);
            this.rolesLoaded(true);
            return roles;
        });
    }

    public hasRole(roleName: string) {
        return this.rolesLoaded.whenNotNull().then(() => this.roles().indexOf(roleName) >= 0);
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