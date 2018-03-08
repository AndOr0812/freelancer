import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import Modal from './components/modal';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import reduxThunk from 'redux-thunk';

import App from './components/app';
import SignUp from './containers/signup';
import Login from './containers/login';
/*
import Headers from './components/headers';
*/
import reducers from './reducers';
import Profile from "./components/profile";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>

      <div>
      <BrowserRouter>
          <Switch>
              <Route path="/profile" component={Profile}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/login" component={Login}/>
              <Route path="/" component={App}/>
          </Switch>
      </BrowserRouter>
      </div>
  </Provider>
  , document.querySelector('#maincontainer'));
