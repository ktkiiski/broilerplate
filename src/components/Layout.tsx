import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as React from 'react';
import { api } from '../client';
import { router } from '../router';
import AppDrawer from './AppDrawer';
import BoardList from './BoardList';
import Profile from './Profile';
import PromptModal from './PromptModal';
import SignOutListItem from './SignOutListItem';
import TopBar from './TopBar';

const stylizeRoot = withStyles(({spacing}) => ({
    root: {
        padding: spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1024,
    },
}));

const Root = stylizeRoot(({classes, children}) => (
    <div className={classes.root}>{children}</div>
));

interface LayoutProps {
    title: string;
    menu?: React.ReactNode;
}

interface LayoutState {
    isDrawerOpen: boolean;
    isCreateModalOpen: boolean;
}

class Layout extends React.Component<LayoutProps, LayoutState> {
    public state = {
        isDrawerOpen: false,
        isCreateModalOpen: false,
    };
    public openDrawer = () => {
        this.setState({isDrawerOpen: true});
    }
    public closeDrawer = () => {
        this.setState({isDrawerOpen: false});
    }
    public openCreateModal = () => {
        this.setState({
            isDrawerOpen: false,
            isCreateModalOpen: true,
        });
    }
    public closeCreateModal = () => {
        this.setState({isCreateModalOpen: false});
    }
    public onCreateModalSubmit = async (title: string) => {
        this.closeCreateModal();
        const board = await api.userBoardCollection.postWithUser({title});
        router.push('showBoard', {boardId: board.id});
    }
    public render() {
        const {title, children, menu} = this.props;
        return <>
            <TopBar title={title} onMenuButtonClick={this.openDrawer} menu={menu} />
            <AppDrawer
                disableRestoreFocus={this.state.isCreateModalOpen}
                open={this.state.isDrawerOpen}
                onClose={this.closeDrawer}
            >
                <Profile />
                <Divider />
                <div onClick={this.closeDrawer}>
                    <BoardList />
                </div>
                <Divider />
                <List>
                    <ListItem onClick={this.openCreateModal} button>
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText>Create a list</ListItemText>
                    </ListItem>
                    <SignOutListItem onClick={this.closeDrawer}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText>Sign out</ListItemText>
                    </SignOutListItem>
                </List>
            </AppDrawer>
            <Root>{children}</Root>
            <PromptModal
                open={this.state.isCreateModalOpen}
                onClose={this.closeCreateModal}
                onSubmit={this.onCreateModalSubmit}
                title='Create a new list'
                label='List name'
                closeButtonText='Close'
                submitButtonText='Create'
            />
        </>;
    }
}

export default Layout;
