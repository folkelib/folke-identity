import { Services } from './services';
import register from './identity-register';
export { fr } from './fr';
export declare function register(services: Services, role: string): void;
export declare function registerBase(services: Services): void;
export declare function registerAdministration(role: string): void;
export declare function registerMenu(): void;
export declare function registerAdministrationMenu(role: string): void;
export default register;