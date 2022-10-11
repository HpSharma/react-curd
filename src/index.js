import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";

import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { detailReducer } from "./redux/reducers/detailReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(detailReducer, composeWithDevTools());

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
