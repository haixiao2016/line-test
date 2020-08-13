import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Facebook from "./pages/Facebook"
import Line from "./pages/Line"
import Google from "./pages/Google"
import { Menu } from "antd";
import { Route, BrowserRouter, Link } from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item><Link to="/facebook">facebook</Link></Menu.Item>
        <Menu.Item><Link to="/line">line</Link></Menu.Item>
        <Menu.Item><Link to="/google">google</Link></Menu.Item>
      </Menu>
      <div style={{marginTop: 30, marginLeft: 30}}>
        <Route path='/facebook' component={Facebook} />
        <Route path='/line' component={Line} />
        <Route path='/google' component={Google} />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
