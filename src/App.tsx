import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { renderRoute } from 'broilerkit/react/router';
import * as React from 'react';
import ErrorMessage from './components/ErrorMessage';
import Home from './components/Home';
import PollView from './components/PollView';
import { router } from './router';
import { mainTheme } from './themes';

const MainContent = renderRoute(router)
    .withDefault(() => <ErrorMessage message='Page not found' />)
    .withStates({
        home: () => <Home />,
        showPoll: ({pollId}) => <PollView id={pollId} />,
    })
;

const App = () => (
    <MuiThemeProvider theme={mainTheme}>
        <CssBaseline />
        <MainContent />
    </MuiThemeProvider>
);

export default App;