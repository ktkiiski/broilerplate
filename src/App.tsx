import CssBaseline from '@material-ui/core/CssBaseline';
import { renderRoute } from 'broilerkit/react/router';
import * as React from 'react';
import BoardView from './components/BoardView';
import ErrorMessage from './components/ErrorMessage';
import Home from './components/Home';
import { router } from './router';

const MainContent = renderRoute(router)
    .withDefault(() => <ErrorMessage message='Page not found' />)
    .withStates({
        home: () => <Home />,
        showBoard: ({boardId}) => <BoardView board={{id: boardId}} />,
    })
;

const App = () => (<>
    <CssBaseline />
    <MainContent />
</>);

export default App;
