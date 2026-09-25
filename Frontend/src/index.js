import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { HelmetProvider } from "react-helmet-async";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

// react-snap prerendered HTML ko hydrate karta hai, fresh render nahi karta
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}

serviceWorkerRegistration.register();
