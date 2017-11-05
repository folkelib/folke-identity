import { Services, User } from './services';
import * as ko from 'knockout';
import { Application, Route } from 'folke-core';
import { Identity } from './identity';
import { IdentityLoginViewModel } from './identity-login';
import { Menu } from 'folke-menu';
import { React, ko_if, ko_ifnot, ko_foreach } from "kjsx";
import { IdentityUsersViewModel } from "./identity-users";
import { IdentityUser } from './identity-user';
import {IdentityRolesViewModel} from "./identity-roles";
import { register } from "folke-ko-promise";

register();

export class Authentication<TKey> implements Identity<TKey> {
    constructor(public app: Application, public services: Services<TKey>, public menu?: Menu) {
        this.updateMe();
    }

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
            return new Promise(resolve => this.goToLogin(resolve));
        })
    }

    public goToLogin(onLogin: () => void) {
        this.app.showPopin(<IdentityLoginViewModel  identity={this} onLogin={onLogin} />);
    }

    public addLoggedRoute<T>(route: Route<T>) {
        this.app.addRoute({ route: route.route, onRoute: parameters => this.whenLogged().then(x => {
            return route.onRoute(parameters);
        })});
    }

    public addRoleRoute<T>(route: Route<T>, role: string) {
        this.app.addRoute({ route: route.route, onRoute: parameters => this.whenLogged().then(x => this.whenHasRole(role))
            .then(hasRole => {
                if (hasRole) {
                    return route.onRoute(parameters);
                }
                else {
                    this.app.hidePopin();
                    return <div>{`Unauthorized access. Need role ${role}`}</div>;
                }
            })});
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

    register(adminRole: string) {
        this.registerAdministration(adminRole);
        this.registerMenu();
        this.registerAdministrationMenu(adminRole);
    }
    
    registerAdministration(role: string) {
        this.addRoleRoute({ route: 'users', onRoute: () => <IdentityUsersViewModel identity={this} /> }, role);
        this.addRoleRoute({ route: 'user/{id}', onRoute: (params: {id: string}) => <IdentityUser identity={this} {...params}/>}, role);
        this.addRoleRoute({ route: 'roles', onRoute: () => <IdentityRolesViewModel identity={this} /> }, role);
    }
    
    registerMenu() {
        if (!this.menu) return;
        var subMenu = this.menu.addCustomSubMenu('identity-button');
        subMenu.addButton(ko.observable('Se déconnecter'), () => this.logout());
    }
    
    registerAdministrationMenu(role: string) {
        if (!this.menu) return;
        var subMenu = this.menu.addSubMenu(ko.observable('Administration'), 1, ko.computed(() => this.hasRole(role)));
        subMenu.addRouteButton(ko.observable('Utilisateurs'), 'users');
        subMenu.addRouteButton(ko.observable('Rôles'), 'roles');
    }    
}
