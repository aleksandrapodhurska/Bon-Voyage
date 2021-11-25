import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import {ProvideAuth} from "./hooks/useAuth.hook";

ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
          <ProvideAuth>
              <App />
          </ProvideAuth>
      </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

