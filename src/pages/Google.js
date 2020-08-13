import React, { useEffect, useState } from 'react';
import GoogleLogin from '../SDK/googleLogin';
import axios from "axios";
import { Button, Card, message } from 'antd';
const { Meta } = Card;

function App() {
  const [userData, setUserData] = useState(undefined);
  const [isLoading, setLoading] = useState(false)
  function onError() {
    setLoading(false)
    message.error("取消授权或部分权限没有开启")
  }
  function onSuccess(userMsg) {
    getUserInfo(userMsg)
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
  useEffect(() => {
    new GoogleLogin({
      client_id: "326196238770-r5t1hc8dfkf80jhbckbvp7qous2kk7b8.apps.googleusercontent.com",
      el: document.querySelector(".google-btn-signin")
    }, onSuccess, onError)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="google">
      <Button className="google-btn-signin" type="primary" onClick={()=> setLoading(true)} loading={isLoading}>google login</Button>
      {
        userData ?
          <Card
            hoverable
            style={{ width: 240, marginTop: 40 }}
            cover={<img alt="example" src={userData.picture} />}
          >
            <Meta title={userData.name} description={"email:" + userData.email} />
          </Card> : null
      }
    </div>
  );
}

export default App;
