import React, { Component } from 'react';
import Header from './header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {/*components rendered via nested routes
        end up on props.children*/}
        {this.props.children}
      </div>
    );
  }
}
