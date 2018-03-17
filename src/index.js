import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import userName from './util/NameGenerator'

ReactDOM.render(<App username ={userName} />, document.getElementById('root'));
registerServiceWorker();
