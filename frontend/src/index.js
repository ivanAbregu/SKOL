import React from "react";
import "./index.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom'
import {ThroughProvider} from 'react-through'
import store from "./store";

window.render_components = properties => {
    window.params = {...properties};
    console.log(window.params);
    render(
        (<Provider store={store}>
            <BrowserRouter>
                <ThroughProvider>
                    <App backendContext={properties}/>
                </ThroughProvider>
            </BrowserRouter>
        </Provider>), document.getElementById('root'));
};

if (module.hot) {
    if (window.params) window.render_components(window.params);
    module.hot.accept();
}

registerServiceWorker();
