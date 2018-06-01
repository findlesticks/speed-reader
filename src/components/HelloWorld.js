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
    const abstractText = window.jsonData.abstract;
    const bodyText = window.jsonData.body;
    const titleText = window.jsonData.title;
    this.setState({ abstractText, bodyText, titleText });
  }
  render() {
    if (this.state.abstractText && this.state.bodyText) {
      return (
        <App
          id={"1234"}
          text={this.state.bodyText}
          abstract={this.state.abstractText}
          title={this.state.titleText}
        />
      );
    }
    return null;
  }
}
