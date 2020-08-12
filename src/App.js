import React, { useEffect } from 'react';
import './App.css';
import { init as lineInit, login as lineLogin, getAccessToken as lineGetAccessToken } from '@line/liff'
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
    console.log(res)
    return Promise.resolve(res)
  }).catch(err=> {
    return Promise.reject(err)
  })
}
function App() {
  useEffect(() => {
    init().then(res=> {
      if(res) {
        lineGetAccessToken().then(r=> {
          console.log(res)
        })
      }
    })
  }, []);
  return (
    <div className="App">
      <Button type="primary" onClick={ handleGetUserInfo }>登录</Button>
    </div>
  );
}

export default App;
