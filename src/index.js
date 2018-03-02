import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './base.css';

import Toggle from './components/1-Toggle-App';

ReactDOM.render(<Toggle />, document.getElementById('root'));
registerServiceWorker();
