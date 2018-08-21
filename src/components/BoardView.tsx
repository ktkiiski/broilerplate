import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { renderUserResources } from 'broilerkit/react/api';
import * as React from 'react';
import { api } from '../client';
import { router } from '../router';
import BoardItemList from './BoardItemList';
import CreateBoardItemForm from './CreateBoardItemForm';
import Layout from './Layout';
import PromptModal from './PromptModal';

const BoardViewBase = renderUserResources({
    board: api.userBoardResource,
}, {
    isUpdateModalOpen: false,
});

class BoardView extends BoardViewBase {

    public openUpdateModal = () => {
        this.setState({isUpdateModalOpen: true});
    }
    public closeUpdateModal = () => {
        this.setState({isUpdateModalOpen: false});
    }
    public onUpdateModalSubmit = async (title: string) => {
        this.closeUpdateModal();
        await api.userBoardResource.patchWithUser({...this.props.board, title});
    }
    public deleteBoard = async () => {
        await api.userBoardResource.deleteWithUser(this.props.board);
        router.replace('home', {});
    }
    public onNewItemSubmit = async (description: string) => {
        const boardId = this.props.board.id;
        return await api.userBoardItemCollection.postWithUser({boardId, description});
    }

    public render() {
        const {board, isUpdateModalOpen} = this.state;
        return <Layout title={board ? `Board ${board.title}` : ''} menu={[
            <MenuItem key='rename' onClick={this.openUpdateModal}>Rename board</MenuItem>,
            <MenuItem key='delete' onClick={this.deleteBoard}>Delete board</MenuItem>,
        ]}>
            <Grid container direction='row-reverse' justify='center' alignItems='flex-start' spacing={8}>
                <Grid item sm={3} xs={12}>
                    <Paper style={{padding: '12px'}}>
                        <Typography>Info</Typography>
                    </Paper>
                </Grid>
                <Grid item sm={9} xs={12}>
                    <Paper style={{padding: '12px'}}>
                        <CreateBoardItemForm onSubmit={this.onNewItemSubmit} />
                        <BoardItemList boardId={this.props.board.id} />
                    </Paper>
                </Grid>
            </Grid>
            <PromptModal
                open={isUpdateModalOpen}
                onClose={this.closeUpdateModal}
                onSubmit={this.onUpdateModalSubmit}
                defaultValue={board && board.title}
                title='Rename the list'
                label='List name'
                closeButtonText='Cancel'
                submitButtonText='Rename'
            />
        </Layout>;
    }
}

export default BoardView;
