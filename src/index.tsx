import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./components/app";
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import {initStore} from '../src/utils/store'

export const store = initStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);