import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import App from './App';

import store from './store/store';
import { Provider } from 'react-redux';

import {UserContextProvider} from "./context/userContext";
import {CoursesContextProvider} from "./context/coursesContext";
import {StudentsContextProvider} from "./context/studentsContext";
import {SubscriptionContextProvider} from "./context/subscriptionsContext";

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <UserContextProvider>
              <CoursesContextProvider>
                  <StudentsContextProvider>
                      <SubscriptionContextProvider>
                        <App />
                      </SubscriptionContextProvider>
                  </StudentsContextProvider>
              </CoursesContextProvider>
          </UserContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
