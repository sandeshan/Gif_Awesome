import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './Images/logo.gif';
import { Tabs, Icon } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import Trending from './Components/trendingContainer';
import Search from './Components/searchContainer';

const TabPane = Tabs.TabPane;

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
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab={<span><Icon type="line-chart" />Trending</span>} key="1">
            <Trending />
          </TabPane>
          <TabPane tab={<span><Icon type="search" />Search</span>} key="2">
            <Search />
          </TabPane>
          <TabPane tab={<span><Icon type="heart" />Favorites</span>} key="3">
            Favorites
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
