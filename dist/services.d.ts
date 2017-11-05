/// <reference types="knockout" />
export interface SetEmailView {
    email: string;
}
export interface ForgotPasswordView {
    email: string;
}
export interface AuthenticationScheme {
    name?: string;
    displayName?: string;
    handlerType?: any;
}
export interface ChangePasswordView {
    confirmPassword: string;
    newPassword: string;
    oldPassword: string;
}
export interface LoginView {
    email: string;
    password: string;
    rememberMe: boolean;
}
export interface LoginResultView {
    status: number;
}
export interface RegisterView {
    email: string;
    password: string;
    confirmPassword: string;
}
export interface ResetPasswordView {
    userId: string;
    code: string;
    password: string;
    confirmPassword: string;
}
export interface RoleView<TKey> {
    name: string;
    id: TKey;
}
export interface SetPasswordView {
    newPassword: string;
}
export interface UserSearchFilter {
    name: string;
}
export interface User<TKey> {
    userName: string;
    logged: boolean;
    emailConfirmed: boolean;
    email: string;
    id: TKey;
    hasPassword: boolean;
}
export declare const enum LoginStatusEnum {
    Success = 0,
    LockedOut = 1,
    RequiresVerification = 2,
}
export declare let loading: KnockoutObservable<boolean>;
export interface AccountController<TKey> {
    setEmail: (params: {
        model: SetEmailView;
    }) => Promise<{}>;
    changePassword: (params: {
        view: ChangePasswordView;
    }) => Promise<{}>;
    setPassword: (params: {
        model: SetPasswordView;
    }) => Promise<{}>;
    getMe: (params: {}) => Promise<User<TKey>>;
    getUserRoles: (params: {}) => Promise<string[]>;
    get: (params: {
        id: any;
    }) => Promise<User<TKey>>;
    search: (params: {
        offset: number;
        limit: number;
        sortColumn: string;
        filter: UserSearchFilter;
    }) => Promise<User<TKey>[]>;
}
export interface AuthenticationController<TKey> {
    forgotPassword: (params: {
        forgotPasswordView: ForgotPasswordView;
    }) => Promise<{}>;
    getExternalAuthenticationProviders: (params: {}) => Promise<AuthenticationScheme[]>;
    login: (params: {
        loginView: LoginView;
    }) => Promise<LoginResultView>;
    register: (params: {
        registerView: RegisterView;
    }) => Promise<User<TKey>>;
    logOff: (params: {}) => Promise<{}>;
    resetPassword: (params: {
        resetPasswordView: ResetPasswordView;
    }) => Promise<{}>;
    confirmEmail: (params: {
        userId: any;
        code: string;
    }) => Promise<{}>;
}
export interface RoleController<TKey> {
    create: (params: {
        name: string;
    }) => Promise<RoleView<TKey>>;
    getAll: (params: {}) => Promise<RoleView<TKey>[]>;
    delete: (params: {
        id: any;
    }) => Promise<{}>;
    addUser: (params: {
        userId: any;
        roleName: string;
    }) => Promise<{}>;
    deleteUser: (params: {
        userId: any;
        roleName: string;
    }) => Promise<{}>;
    getForUser: (params: {
        userId: any;
    }) => Promise<string[]>;
}
export interface Services<TKey> {
    account: AccountController<TKey>;
    authentication: AuthenticationController<TKey>;
    role: RoleController<TKey>;
    loading: () => boolean;
}
