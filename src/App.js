import React from 'react';
import './App.css';
import { init as lineInit, login as lineLogin } from '@line/liff'
import { Button } from 'antd'
import 'antd/dist/antd.css';
const liffId = '1654651020-nRqoNOA9'
function handleGetUserInfo() {
  init().then(res=> {
    console.log(res)
    if(!res) {
      lineLogin({
        redirectUri: "https://www.haixiao.online"
      })
    }
  })
}

function init() {
  return lineInit({ liffId }).then(res=> {
    return Promise.resolve(res)
  }).catch(err=> {
    return Promise.reject(err)
  })
}
function App() {
  return (
    <div className="App">
      <Button type="primary" onClick={ handleGetUserInfo }>登录</Button>
    </div>
  );
}

export default App;
