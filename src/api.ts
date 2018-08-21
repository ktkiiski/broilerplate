import { endpoint } from 'broilerkit/api';
import { board, item } from './resources';

export const userBoardCollection = endpoint(board, 'id')
    .url `/users/${'userId'}/boards`
    .authorizeBy('userId')
    .listable({
        auth: 'user',
        orderingKeys: ['createdAt'],
    })
    .creatable({
        auth: 'user',
        required: ['title'],
        optional: [],
        defaults: {},
    })
;

export const userBoardResource = endpoint(board, 'id')
    .url `/users/${'userId'}/boards/${'id'}`
    .authorizeBy('userId')
    .retrievable({
        auth: 'user',
    })
    .destroyable({
        auth: 'user',
    })
    .updateable({
        auth: 'user',
        required: ['title'],
        optional: [],
        defaults: {},
    })
;

export const userBoardItemCollection = endpoint(item, 'id')
    .url `/users/${'userId'}/boards/${'boardId'}/items`
    .authorizeBy('userId')
    .listable({
        auth: 'user',
        orderingKeys: ['createdAt'],
    })
    .creatable({
        auth: 'user',
        required: ['description'],
        optional: [],
        defaults: {},
    })
;

export const userBoardItemResource = endpoint(item, 'id')
    .url `/users/${'userId'}/boards/${'boardId'}/items/${'id'}`
    .authorizeBy('userId')
    .retrievable({
        auth: 'user',
    })
    .destroyable({
        auth: 'user',
    })
    .updateable({
        auth: 'user',
        required: ['description'],
        optional: [],
        defaults: {},
    })
;
