import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import * as React from 'react';

interface CreateBoardItemFormProps {
    onSubmit: (description: string) => Promise<any>;
}

interface CreateBoardItemFormState {
    description: string;
    isFocused: boolean;
    isCreating: boolean;
}

class CreateBoardItemForm extends React.Component<CreateBoardItemFormProps, CreateBoardItemFormState> {
    public state = {
        description: '',
        isFocused: false,
        isCreating: false,
    };
    public render() {
        const description = this.state.description;
        const isDisabled = !description.trim() || this.state.isCreating;
        return <form onSubmit={this.onSubmit}>
            <Grid container spacing={8} alignItems='flex-end'>
                <Grid item xs>
                    <TextField
                        label='Write something to do'
                        value={description}
                        onChange={this.onChange}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <IconButton color='primary' disabled={isDisabled} type='submit'>
                        <AddCircleIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </form>;
    }
    private onSubmit: React.FormEventHandler<HTMLElement> = async (event) => {
        event.preventDefault();
        const description = this.state.description.trim();
        this.setState({isCreating: true});
        try {
            await this.props.onSubmit(description);
        } finally {
            this.setState({isCreating: false});
        }
        this.setState({description: ''});
    }
    private onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({description: event.target.value});
    }
}

export default CreateBoardItemForm;
