import React, { useEffect, useState } from 'react';
import FacebookLogin from '../SDK/facebookLogin';
import axios from "axios";
import { Button, Card, message } from 'antd';
import ReactJson from 'react-json-view';
const { Meta } = Card;
let fbLogIn;

function App() {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setLoading] = useState(false)

  function handleSignin() {
    setLoading(true)
    fbLogIn.login()
  }
  function onError() {
    setLoading(false)
    message.error("取消授权或部分权限没有开启")
  }
  function onSuccess(facebookUser) {
    getUserInfo(facebookUser)
  }
  function getUserInfo(facebookUser) {
    axios.get("https://www.haixiao.online/api/facebook/userInfoBySDK", {
      params: {
        user_id: facebookUser.userID,
        access_token: facebookUser.accessToken
      }
    }).then(res => {
      setUserData(res.data)
    }).catch(err => {
      if (err && err.error) {
        message.error(err.error.message);
      }
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }
  function handleLogout() {
    fbLogIn.logout(function (res) {
      setUserData(undefined)
    })
  }
  useEffect(() => {
    fbLogIn = new FacebookLogin({
      appId: "320868815625915",
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
              cover={<img alt="example" src={userData.picture.data.url} />}
            >
              <Meta title={userData.name} description={"email:" + userData.email} />
            </Card>
            <Button type="primary" danger onClick={handleLogout}>facebook logout</Button>
            <ReactJson style={{ marginTop: 40, marginBottom: 40 }} src={userData} enableClipboard={false} />
          </> : <Button type="primary" onClick={handleSignin}>facebook login</Button>
      }
    </div>
  );
}

export default App;
