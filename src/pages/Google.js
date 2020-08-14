import React, { useEffect, useState } from 'react';
import GoogleLogin from '../SDK/googleLogin';
import axios from "axios";
import { Button, Card, message } from 'antd';
import ReactJson from 'react-json-view';
const { Meta } = Card;
let GOLOGIN;

function App() {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setLoading] = useState(false)
  function onError(err) {
    console.log(err)
    setLoading(false)
    message.error("取消授权或部分权限没有开启")
  }
  function onSuccess(userMsg) {
    getUserInfo(userMsg)
  }
  function handleLogin() {
    if(!GOLOGIN.ready) {
      message.error("相关资源未加载，请稍后再试")
    } else {
      setLoading(true)
    }
  }
  function getUserInfo({ wc }) {
    axios.get("https://www.haixiao.online/api/google/userInfoBySDK", {
      params: {
        id_token: wc.id_token,
      }
    }).then(res => {
      setUserData(res.data)
    }).catch(err => {
      if (err && err.error) {
        message.error(err.error.message);
      }
    }).finally(() => {
      setLoading(false)
    })
  }
  // function handleLogout() {
  //   GOLOGIN.logout(function (res) {
  //     setUserData(undefined)
  //   })
  // }
  useEffect(() => {
    GOLOGIN = new GoogleLogin({
      client_id: "326196238770-r5t1hc8dfkf80jhbckbvp7qous2kk7b8.apps.googleusercontent.com",
      el: document.querySelector(".google-btn-signin")
    }, onSuccess, onError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="google">
      {
        userData ?
          <>
            <Card
              hoverable
              style={{ width: 240, marginTop: 40, marginBottom: 40 }}
              cover={<img alt="example" src={userData.picture} />}
            >
              <Meta title={userData.name} description={"email:" + userData.email} />
            </Card>
            {/* <Button type="primary" danger onClick={handleLogout}>facebook logout</Button> */}
            <ReactJson style={{ marginTop: 40, marginBottom: 40 }} src={userData} enableClipboard={false} />
          </> : <Button className="google-btn-signin" type="primary" onClick={handleLogin} loading={isLoading}>google login</Button>
      }
    </div>
  );
}

export default App;
