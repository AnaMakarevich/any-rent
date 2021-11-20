import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
//const App = () => {
// return <h1>This is my React app!</h1>;
// }
ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    document.getElementById('app'));