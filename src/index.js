import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // <-- this

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorkerRegistration.register(); // <-- enable the service worker
