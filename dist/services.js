"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services = null;
function get() {
    if (services === null) {
        throw new Error("register not called");
    }
    return services;
}
exports.get = get;
function register(options) {
    services = options;
}
exports.register = register;
