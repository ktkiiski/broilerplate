import { Created, OK } from 'broilerkit/http';
import { identifier } from 'broilerkit/id';
import { implement } from 'broilerkit/server';
import * as api from './api';
import * as db from './db';

export const userBoardCollection = implement(api.userBoardCollection, db)
    .list(async ({ordering, since, direction}, {boards, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Listing with user:`, await users.retrieve({id: auth.id}));
        const items = await boards.list({
            ordering, direction, since,
            minCount: 1,
            maxCount: 100,
        });
        return items;
    })
    .create(async (input, {boards, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Creating a board with user:`, await users.retrieve({id: auth.id}));
        const now = new Date();
        const board = {
            ...input,
            id: identifier(now),
            version: identifier(now),
            userId: auth.id,
            createdAt: now,
            updatedAt: now,
        };
        await boards.create(board);
        return new Created(board);
    })
;

export const userBoardResource = implement(api.userBoardResource, db)
    .retrieve(async ({id}, {boards}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Retrieving board ${id} with user:`, auth);
        return await boards.retrieve({id});
    })
    .update(async ({id, ...changes}, {boards, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Updating board ${id} with user:`, await users.retrieve({id: auth.id}));
        const now = new Date();
        const boardChanges = {
            ...changes,
            version: identifier(now),
            updatedAt: now,
        };
        const board = await boards.update({id}, boardChanges);
        return new OK(board);
    })
    .destroy(async ({id}, {boards, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Destroying board ${id} with user:`, await users.retrieve({id: auth.id}));
        await boards.destroy({id});
    })
;

export const userBoardItemCollection = implement(api.userBoardItemCollection, db)
    .list(async ({ordering, since, direction}, {items, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Listing an item with user:`, await users.retrieve({id: auth.id}));
        return await items.list({
            ordering, direction, since,
            minCount: 1,
            maxCount: 100,
        });
    })
    .create(async (input, {items, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Creating an item to board ${input.boardId} with user:`, await users.retrieve({id: auth.id}));
        const now = new Date();
        const item = {
            ...input,
            id: identifier(now),
            version: identifier(now),
            userId: auth.id,
            createdAt: now,
            updatedAt: now,
        };
        await items.create(item);
        return new Created(item);
    })
;

export const userBoardItemResource = implement(api.userBoardItemResource, db)
    .retrieve(async ({id, userId, boardId}, {items}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Retrieving item ${id} of board ${boardId} of user ${userId} with user:`, auth);
        return await items.retrieve({id});
    })
    .update(async ({id, userId, boardId, ...changes}, {items, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Updating item ${id} of board ${boardId} of user ${userId} with user:`, await users.retrieve({id: auth.id}));
        const now = new Date();
        const boardChanges = {
            ...changes,
            version: identifier(now),
            updatedAt: now,
        };
        const board = await items.update({id}, boardChanges);
        return new OK(board);
    })
    .destroy(async ({id, userId, boardId}, {boards, users}, {auth}) => {
        // tslint:disable-next-line:no-console
        console.log(`Destroying item ${id} of board ${boardId} of user ${userId} with user:`, await users.retrieve({id: auth.id}));
        await boards.destroy({id});
    })
;
