import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './base.css';

import ToggleWrap from './components/1-Toggle-App/';

ReactDOM.render(<ToggleWrap />, document.getElementById('root'));
registerServiceWorker();
