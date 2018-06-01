import React from 'react';
import ReactDom from 'react-dom';
import App from "./App";

import compose from './compose';

export default class HelloWorld extends React.Component {
  constructor() {
    super();
    this.state = { component: null };
  }
  componentDidMount() {
    const abstractComponent = compose(window.jsonData[0]);
    const bodyComponent = compose(window.jsonData[1]);
    this.setState({ abstractComponent, bodyComponent });
  }
  render() {
    return (
      <App
        id={"1234"}
        text={this.state.bodyComponent}
        abstract={this.state.abstractComponent}
      />
    );
  }
}
