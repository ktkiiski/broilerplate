import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Layout from './Layout';

const Home = () => (
    <Layout title='Boards Home'>
        <Paper>
            <Typography>Home</Typography>
            <Button onClick={() => ({})}>Show boards</Button>
        </Paper>
    </Layout>
);

export default Home;
