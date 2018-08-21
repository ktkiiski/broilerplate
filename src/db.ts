import { table } from 'broilerkit/db';
import { board, item } from './resources';

export const boards = table('Boards')
    .resource(board)
    .identifyBy('id')
    .versionBy('version')
;

export const items = table('Items')
    .resource(item)
    .identifyBy('id')
    .versionBy('version')
;
