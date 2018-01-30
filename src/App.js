import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './Images/logo.gif';
import { Tabs, Icon } from 'antd';
import { Layout, } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import Trending from './Components/trendingContainer';
import Search from './Components/searchContainer';

const { Header, Content } = Layout;

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

      <Layout>
        <Header style={{ position: 'fixed', width: '100%', color: '#ffffff' }}>
          <img src={logo} className="App-logo" alt="logo" /> <span style={{ fontSize: '18px'}}>Awesome Gif Explorer!</span>
        </Header>
        <div style={{ marginTop: 64 }}>
          <Tabs defaultActiveKey="1" size="large">
            <TabPane tab={<span><Icon type="line-chart" />Trending</span>} key="1">
              <Trending />
            </TabPane>
            <TabPane tab={<span><Icon type="search" />Search</span>} key="2">
              <Search />
            </TabPane>
            <TabPane tab={<span><Icon type="heart" />Favorites</span>} key="3">
              Favorites Coming Soon!
              </TabPane>
          </Tabs>
        </div>
      </Layout>
    );
  }
}

export default App;
