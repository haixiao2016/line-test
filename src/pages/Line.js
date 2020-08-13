import React, { useEffect, useState } from 'react';
import LineLogin from '../SDK/lineLogin';
import { Button, Card, message } from 'antd';
import axios from "axios";
const { Meta } = Card;
let LiLogin;

function Line() {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setLoading] = useState(false)

  function handleSignin() {
    setLoading(true)
    LiLogin.login()
  }
  function onError() {
    setLoading(false)
    message.error("请求出错")
  }
  function onSuccess(access_token) {
    setLoading(true)
    getUserInfo(access_token)
  }
  function getUserInfo(access_token) {
    axios.get("https://www.haixiao.online/api/line/userInfoBySDK", {
      params: {
        access_token
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
  useEffect(() => {
    LiLogin = new LineLogin({
      liffId: "1654651020-nRqoNOA9",
      redirectUri: "https://www.haixiao.online/line"
    }, onSuccess, onError)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="google">
      <Button type="primary" onClick={handleSignin} loading={isLoading}>line login</Button>
      {
        userData ?
          <Card
            hoverable
            style={{ width: 240, marginTop: 40 }}
            cover={<img alt="example" src={userData.pictureUrl} />}
          >
            <Meta title={userData.displayName} description={"用户ID:" + userData.userId} />
          </Card> : null
      }
    </div>
  );
}

export default Line;
