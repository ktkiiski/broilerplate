import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { renderUserCollection } from 'broilerkit/react/api';
import * as React from 'react';
import { api } from '../client';

const BoardItemListBase = renderUserCollection(api.userBoardItemCollection, {
    ordering: 'createdAt',
    direction: 'desc',
});

class BoardItemList extends BoardItemListBase {
    public render() {
        const {isComplete, items} = this.state;
        if (items == null) {
            return <Typography variant='caption'>Sign in to see the items</Typography>;
        }
        return <>
            {items.length > 0 && <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.description} />
                    </ListItem>
                ))}
            </List>}
            {isComplete ? null : <CircularProgress />}
        </>;
    }
}

export default BoardItemList;
