/*
 * @Author: small
 * @Description: 
 * @Date: 2020-08-10 11:32:34
 * @LastEditTime: 2020-08-11 15:30:54
 * @FilePath: /line-test/src/App.js
 */
import React, { useEffect } from 'react';
import './App.css';
import { init as lineInit, login as lineLogin } from '@line/liff'
import { Button } from 'antd'
import axios from 'axios'
import 'antd/dist/antd.css';
const getUrlParams = (queryName) => {
  const reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}
const liffId = '1654651020-nRqoNOA9'
function handleGetUserInfo() {
  lineInit({ liffId }).then(_=> {
    lineLogin({
      redirectUri: "https://www.haixiao.online"
    })
  }).catch(err=> {
    console.log(err)
  })
}
function App() {
  useEffect(() => {
    // 查看url中是否包含code
    const code = getUrlParams("code")
    if(code) {
      // 服务端请求
      const s = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "https://www.haixiao.online",
        client_id: "1654651020",
        client_secret: "739c9f5d192273bc77828d9646f2689c"
      }
      axios({
        method: "POST",
        url: "https://api.line.me/oauth2/v2.1/token",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: s
      })
    }
  }, []);
  return (
    <div className="App">
      <Button type="primary" onClick={ handleGetUserInfo }>登录</Button>
    </div>
  );
}

export default App;
