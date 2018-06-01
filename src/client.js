import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld';

ReactDOM.hydrate(<HelloWorld />, document.getElementById('content'));
