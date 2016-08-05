import { SetEmailView } from './services';
import * as Folke from 'folke-core';
export default class IdentityEmailViewModel {
    params: Folke.Parameters<any>;
    form: SetEmailView;
    loading: () => boolean;
    constructor(params: Folke.Parameters<any>);
    dispose(): void;
    submit: () => Promise<void>;
}
