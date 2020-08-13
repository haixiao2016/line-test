import React, { useEffect, useState } from 'react';
import './App.css';
import { FacebookLogin, getUrlCode } from './login'
import axios from "axios"
let fbLogIn;

function handleSignin() {
  fbLogIn.login()
}

function App() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    fbLogIn = new FacebookLogin({
      client_id: "320868815625915",
      redirect_uri: "https://www.haixiao.online"
    })
  }, []);
  useEffect(() => {
    const { code, type } = getUrlCode()
    if (code) {
      switch (type) {
        case "FACEBOOK":
          getUserDataByFacebook(code)
          break;
        default:
          break;
      }
    }
  }, []);
  function getUserDataByFacebook(code) {
    axios.get("https://api.haixiao.online/facebook/userInfo", {
      params: {
        code
      }
    }).then(({ data }) => {
      setUserInfo(data)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="google">
      <div className="google-btn-signin" onClick={handleSignin}>facebook登录</div>
      <div>
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
}

export default App;
