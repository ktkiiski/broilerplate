import ListItem from '@material-ui/core/ListItem';
import * as React from 'react';
import { api } from '../client';
import { router } from '../router';
import PromptModal from './PromptModal';

interface CreateBoardButtonProps {
    isOpen: boolean;
}

class CreateBoardListItem extends React.Component<{}, CreateBoardButtonProps> {
    public state = {
        isOpen: false,
    };
    public open = () => this.setState({isOpen: true});
    public close = () => this.setState({isOpen: false});
    public onSubmit = async (title: string) => {
        this.close();
        const board = await api.userBoardCollection.postWithUser({title});
        router.push('showBoard', {boardId: board.id});
    }
    public render() {
        return <>
            <ListItem onClick={this.open} button>{this.props.children}</ListItem>
            <PromptModal
                open={this.state.isOpen}
                onClose={this.close}
                onSubmit={this.onSubmit}
                title='Create a new list'
                label='List name'
                closeButtonText='Close'
                submitButtonText='Create'
            />
        </>;
    }
}

export default CreateBoardListItem;
