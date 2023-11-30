import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import {ProvideAuth} from "./hooks/useAuth.hook";

document.title = "BonVoyage";

ReactDOM.render(
    <BrowserRouter>
      <ProvideAuth>
          <App />
      </ProvideAuth>
    </BrowserRouter>,
  document.getElementById('root')
);

