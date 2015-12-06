/// <reference path="../folke-core/default-components.ts" />
import application from "../folke-core/folke";

export default function (basePath:string) {
    application.registerComponent(basePath + '/components', 'identity-email');
    application.registerComponent(basePath + '/components', 'identity-forgot');
    application.registerComponent(basePath + '/components', 'identity-login');
    application.registerComponent(basePath + '/components', 'identity-password');
    application.registerComponent(basePath + '/components', 'identity-register');
    application.registerComponent(basePath + '/components', 'identity-reset');
}
