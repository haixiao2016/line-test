/*
 * @Author: small
 * @Description: 
 * @Date: 2020-08-10 11:32:34
 * @LastEditTime: 2020-08-10 11:54:05
 * @FilePath: /line-test/src/App.js
 */
import React from 'react';
import './App.css';
import liff from '@line/liff'
import { Button, Divider } from 'antd'
import 'antd/dist/antd.css';
liff.init({ liffId: "1654651020-nRqoNOA9" })


function App() {
  return (
    <div className="App">
      <Button type="primary" onClick={ ()=> alert(`isInClient: ${liff.isInClient()}`) }>isInClient</Button>
      <Divider type="vertical" />
      <Button type="primary" onClick={ ()=> alert(liff.getOS()) }>getOS</Button>
    </div>
  );
}

export default App;
