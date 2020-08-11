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
      const loginTmp = JSON.parse(localStorage.getItem(`LIFF_STORE:${liffId}:loginTmp`)) || {}
      const s = {
        grant_type: "authorization_code",
        code: code,
        code_verifier: loginTmp.codeVerifier,
        appId: liffId,
        id_token_key_type: "JWK",
        redirect_uri: "https://www.haixiao.online",
        client_id: "1654651020"
      }
      axios({
        method: "POST",
        url: "https://api.line.me/oauth2/v2.1/token",
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: s
      }).then(res=> {
        console.log(res)
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
