import application from "../folke-core/folke";

export default function (basePath:string) {
    application.registerComponent(basePath, 'identity-email');
    application.registerComponent(basePath, 'identity-forgot');
    application.registerComponent(basePath, 'identity-login');
    application.registerComponent(basePath, 'identity-password');
    application.registerComponent(basePath, 'identity-register');
    application.registerComponent(basePath, 'identity-reset');
}

export function registerAdministration(basePath: string) {
    application.registerComponent(basePath, 'identity-users');
    application.addRoute('users', 'identity-users');
    application.registerComponent(basePath, 'identity-user');
    application.addRoute('user/{id}', 'identity-user');
    application.registerComponent(basePath, 'identity-roles');
    application.addRoute('roles', 'identity-roles');
}