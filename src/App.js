import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';

import Trending from './Components/trendingContainer';

const API_KEY = 'qx0xpwyBU31bCqwFvSxPGPh643xlVTfo';

class App extends Component {
  constructor() {
    super();
    this.state = { message: '' };
  }

  componentDidMount() {
    fetch('/api/message')
      .then(response => response.json())
      .then(json => this.setState({ message: json }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 style={{color: '#ffffff' }}>Awesome Gif Explorer</h2>
        </div>
        <Trending />
      </div>
    );
  }
}

export default App;
