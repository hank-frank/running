import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { store } from './store/store'
import { Provider } from 'react-redux'

import '../styles/styles.scss';
import App from './components/App.jsx'
const queryClient = new QueryClient()

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
