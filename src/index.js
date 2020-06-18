import 'babel-polyfill'
import 'typeface-muli';
import './react-table-defaults';
import './react-chartjs-2-defaults';
import './styles/index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from 'app/App';
import { CookiesProvider } from 'react-cookie';
ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
