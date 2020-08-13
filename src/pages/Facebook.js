/*
 * @Author: small
 * @Description: 
 * @Date: 2020-08-13 17:25:22
 * @LastEditTime: 2020-08-13 18:15:42
 * @FilePath: /line-test/src/pages/Facebook.js
 */
import React, { useEffect, useState } from 'react';
import FacebookLogin from '../SDK/facebookLogin';
import axios from "axios";
import { Button, Card, message } from 'antd';
const { Meta } = Card;
let fbLogIn;

function App() {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setLoading] = useState(false)

function handleSignin() {
  setLoading(true)
  fbLogIn.login()
}
  function onError(err) {
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
      if(err && err.error) {
        message.error(err.error.message);
      }
      console.log(err)
    }).finally(()=> {
      setLoading(false)
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
      <Button type="primary" onClick={handleSignin} loading={isLoading}>facebook login</Button>
      {
        userData ?
          <Card
            hoverable
            style={{ width: 240, marginTop: 40 }}
            cover={<img alt="example" src={userData.picture.data.url} />}
          >
            <Meta title={userData.name} description={"用户ID:" + userData.id} />
          </Card> : null
      }
    </div>
  );
}

export default App;
