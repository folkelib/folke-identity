"use strict";
exports.services = {};
function register(options) {
    exports.services.account = options.account;
    exports.services.factories = options.factories;
    exports.services.loading = options.loading;
    exports.services.authentication = options.authentication;
    exports.services.role = options.role;
}
exports.register = register;
