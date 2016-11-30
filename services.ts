import * as ko from 'knockout';

export interface SetEmailView {
    email: KnockoutObservable<string>;
    isValid: () => boolean;
    changed: () => boolean;
}

export interface ForgotPasswordView {

}

export interface AuthenticationDescription {
    authenticationScheme: string;
}

export interface ChangePasswordView {

}

export interface LoginView {
}

export interface LoginResultView {
    status: number;
}

export interface RegisterView {

}

export interface ResetPasswordView {
    userId: KnockoutObservable<any>;
    code: KnockoutObservable<string>;
}

export interface RoleView {
    name: string;
    id: any;
}

export interface SetPasswordView {

}

export interface UserSearchFilter {

}

export interface User {
    userName: string;
    logged: boolean;
    emailConfirmed: boolean;
    email: string;
    id: any;
    hasPassword: boolean;
}

export const enum LoginStatusEnum {
	Success = 0,
	LockedOut = 1,
	RequiresVerification = 2
}


export let loading:KnockoutObservable<boolean>;

export interface AccountController {
    setEmail: (params:{ model: SetEmailView }) => Promise<{}>;
    changePassword: (params: {view: ChangePasswordView}) => Promise<{}>;
    setPassword: (params: { model: SetPasswordView}) => Promise<{}>;
    getMe: (params: {}) => Promise<User>;
    getUserRoles: (params:{})=> Promise<string[]>;
    get: (params: { id: any}) => Promise<User>;
    search: (params: { filter: UserSearchFilter }) => Promise<User[]>;
}

export interface AuthenticationController {
    forgotPassword: (params: { forgotPasswordView: ForgotPasswordView }) => Promise<{}>;
    getExternalAuthenticationProviders: (params: {}) => Promise<AuthenticationDescription[]>;
    login: (params: {loginView: LoginView}) => Promise<LoginResultView>;
    register: (params: { registerView: RegisterView }) => Promise<User>;
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
    createSetEmailView: (data: { email: string }) => SetEmailView;
    createForgotPasswordView: (data: { email: string }) => ForgotPasswordView;
    createLoginView: (data: { email: string, password: string, rememberMe: boolean }) => LoginView;
    createSetPasswordView: (data: { newPassword: string }) => SetPasswordView;
    createChangePasswordView: (data: { oldPassword: string, newPassword: string, confirmPassword: string }) => ChangePasswordView;
    createRegisterView: (data: { email: string, password: string }) => RegisterView;
    createResetPasswordView: (data: { password: string }) => ResetPasswordView;
    createUserSearchFilter: (data: { name?: string }) => UserSearchFilter;
}

export interface Services {
    factories: Factories;
    account: AccountController;
    authentication: AuthenticationController;
    role: RoleController;
    loading: () => boolean;
} 

export const services: Services = <Services>{ };

export function register(options: Services) {
    services.account = options.account;
    services.factories = options.factories;
    services.loading = options.loading;
    services.authentication = options.authentication;
    services.role = options.role;
}
