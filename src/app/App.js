import { createGenerateClassName, jssPreset } from '@material-ui/core';
import React, { Component } from 'react'
import { FuseAuthorization, FuseLayout, FuseTheme } from '@fuse';
import JssProvider from 'react-jss/lib/JssProvider';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import { create } from 'jss';
import jssExtend from 'jss-extend';
import history from '../history';
import { Auth } from './auth';
import store from './store';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();
const persistor = persistStore(store);


class App extends Component {
    render() {
        return (
            <AppContext.Provider
                value={{
                    routes
                }}
            >
                <JssProvider jss={jss} generateClassName={generateClassName}>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <Auth>
                                <Router history={history}>
                                    <FuseAuthorization>
                                        <FuseTheme>
                                            <FuseLayout {...this.props}/>
                                        </FuseTheme>
                                    </FuseAuthorization>
                                </Router>
                            </Auth>
                        </PersistGate>
                    </Provider>
                </JssProvider>
            </AppContext.Provider>
        )
    }
}



export default App;
