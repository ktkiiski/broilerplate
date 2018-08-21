import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { renderUserCollection } from 'broilerkit/react/api';
import { order } from 'broilerkit/utils/arrays';
import * as React from 'react';
import { api } from '../client';
import { router } from '../router';

const BoardListBase = renderUserCollection(api.userBoardCollection, {
    ordering: 'createdAt',
    direction: 'asc',
});

class BoardList extends BoardListBase {
    public render() {
        const {isComplete, items} = this.state;
        if (items == null) {
            return <Typography variant='caption'>Sign in to see your boards</Typography>;
        }
        const sortedItems = order(items, 'title', 'asc');
        return <>
            <List>
                {sortedItems.map((board) => (
                    <ListItem
                        key={board.id}
                        button
                        onClick={(event) => {
                            router.push('showBoard', {boardId: board.id});
                            event.preventDefault();
                        }}
                        component='a'
                        href={router.buildUrl('showBoard', {boardId: board.id})}>
                        <ListItemText primary={board.title} />
                    </ListItem>
                ))}
            </List>
            {isComplete ? null : <CircularProgress />}
        </>;
    }
}

export default BoardList;
