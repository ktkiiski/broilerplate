import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as React from 'react';
import DropdownMenu from './DropdownMenu';

interface TopBarProfileMenuProps {
    name?: string;
    onLogout: () => void;
}

class TopBarProfileMenu extends React.Component<TopBarProfileMenuProps> {
    public state = {
        anchorEl: undefined as HTMLElement | undefined,
    };

    public handleOpen: React.MouseEventHandler<HTMLElement> = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    public handleClose: React.MouseEventHandler<HTMLElement> = () => {
        this.setState({ anchorEl: undefined });
    }

    public render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <React.Fragment>
                <Typography color='inherit'>{this.props.name}</Typography>
                <IconButton aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup='true'
                    onClick={this.handleOpen}
                    color='inherit' >
                    <AccountCircle />
                </IconButton>
                <DropdownMenu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.props.onLogout}>Log out</MenuItem>
                </DropdownMenu>
            </React.Fragment>
        );
    }
}

export default TopBarProfileMenu;
