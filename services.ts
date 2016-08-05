import * as ko from 'knockout';

export interface SetEmailView {
    email: ko.Observable<string>;
    isValid: () => boolean;
    changed: () => boolean;
}

export interface ForgotPasswordView {

}

export interface AuthenticationDescription {
    authenticationScheme: ko.Observable<string>;
}

export interface ChangePasswordView {

}

export interface LoginView {
}

export interface LoginResultView {
    status: () => LoginStatusEnum;
}

export interface RegisterView {

}

export interface ResetPasswordView {
    userId: ko.Observable<number>;
    code: ko.Observable<string>;
}

export interface RoleView {
    name: ko.Observable<string>;
    id: any;
}

export interface SetPasswordView {

}

export interface UserSearchFilter {

}

export interface UserViewModel {
    changed: ko.Computed<boolean>;

    userName: ko.Observable<string>;
    logged:  ko.Observable<boolean>;
    emailConfirmed:  ko.Observable<boolean>;
    email: ko.Observable<string>;
    id: any;
    hasPassword: ko.Observable<boolean>;
}

export const enum LoginStatusEnum {
	Success,
	LockedOut,
	RequiresVerification
}


export let loading:ko.Observable<boolean>;

export interface AccountController {
    setEmail: (params:{ model: SetEmailView }) => Promise<{}>;
    changePassword: (params: {view: ChangePasswordView}) => Promise<{}>;
    setPassword: (params: { model: SetPasswordView}) => Promise<{}>;
    getMe: (params: {}) => Promise<UserViewModel>;
    getUserRoles: (params:{})=> Promise<string[]>;
    get: (params: { id: any}) => Promise<UserViewModel>;
    search: (params: { filter: UserSearchFilter }) => Promise<UserViewModel[]>;
}

export interface AuthenticationController {
    forgotPassword: (params: { forgotPasswordView: ForgotPasswordView }) => Promise<{}>;
    getExternalAuthenticationProviders: (params: {}) => Promise<AuthenticationDescription[]>;
    login: (params: {loginView: LoginView}) => Promise<LoginResultView>;
    register: (params: { registerView: RegisterView }) => Promise<UserViewModel>;
    logOff: (params: {}) => Promise<{}>;
    resetPassword: (params: { resetPasswordView: ResetPasswordView }) => Promise<{}>;
    confirmEmail: (params: { userId: any, code: string}) => Promise<{}>;
}

export interface RoleController {
    create: (params:{name: string}) => Promise<RoleView>;
    getAll: (params:{}) => Promise<RoleView[]>;
    delete: (params: {id: any}) => Promise<{}>;
    addUser: (params: { userId: any, roleName: string }) => Promise<{}>;
    deleteUser: (params: { userId: any, roleName: string}) => Promise<{}>;
    getForUser: (params: { userId: any }) => Promise<string[]>;
}

export interface Factories {
    createEmailView: () => SetEmailView;
    createForgotPasswordView: () => ForgotPasswordView;
    createLoginView: () => LoginView;
    createSetPasswordView: () => SetPasswordView;
    createChangePasswordView: () => ChangePasswordView;
    createRegisterView: () => RegisterView;
    createResetPasswordView: () => ResetPasswordView;
    createUserSearchFilter: () => UserSearchFilter;
}

export interface Services{
    factories: Factories;
    account: AccountController;
    authentication: AuthenticationController;
    role: RoleController;
    loading: () => boolean;
} 

export const services: Services = { factories: null, account: null, loading: null, authentication: null, role: null };

export function register(options: Services) {
    services.account = options.account;
    services.factories = options.factories;
    services.loading = options.loading;
    services.authentication = options.authentication;
}
