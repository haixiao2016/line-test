import React, { useState, useEffect } from 'react';
import './App.css';
import { init as lineInit, login as lineLogin, getProfile } from '@line/liff'
import { Button, Descriptions } from 'antd'
import 'antd/dist/antd.css';
const liffId = '1654651020-nRqoNOA9'
const getUrlParams = (queryName) => {
  const reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}
function handleGetUserInfo() {
  init().then(_ => {
    lineLogin({
      redirectUri: "https://www.haixiao.online"
    })
  })
}

function init() {
  return lineInit({ liffId }).then(_ => {
    return Promise.resolve()
  }).catch(err => {
    return Promise.reject(err)
  })
}
function App() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const code = getUrlParams("code")
    if (code) {
      init().then(_ => {
        getProfile().then(res => {
          setUserData(res)
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }, []);
  return (
    <div className="App">
      <Button type="primary" onClick={handleGetUserInfo}>登录</Button>
      <Descriptions title="用户信息">
        {
          Object.keys(userData).map(key => (
            <Descriptions.Item label={key}>{userData[key]}</Descriptions.Item>
          ))
        }
      </Descriptions>
    </div>
  );
}

export default App;
