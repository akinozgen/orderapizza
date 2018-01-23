import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

localStorage.setItem('remote_url', 'http://infusionlabs.net/orderapizza-api/public');
localStorage.setItem('api_key', '123456');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
