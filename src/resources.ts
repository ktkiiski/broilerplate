import { datetime, id, string, uuid } from 'broilerkit/fields';
import { resource } from 'broilerkit/resources';

export const board = resource({
    id: id(),
    version: id(),
    title: string(),
    userId: uuid(),
    createdAt: datetime(),
    updatedAt: datetime(),
});

export const item = resource({
    id: id(),
    version: id(),
    boardId: board.fields.id,
    description: string(),
    userId: uuid(),
    createdAt: datetime(),
    updatedAt: datetime(),
});
