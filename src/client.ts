import {initApi} from 'broilerkit/api';
import {AuthClient} from 'broilerkit/auth';
import * as boardsApi from './api';

export const authClient = new AuthClient(__AUTH_OPTIONS__);
export const api = initApi(__API_ROOT__, boardsApi, authClient);
export const client = {api, authClient};
export type Api = typeof api;
