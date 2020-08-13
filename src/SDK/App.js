import React, { useEffect, useState } from 'react';
import FacebookLogin from './facebookLoginUseSDK'
let fbLogIn;


function handleSignin() {
  fbLogIn.login()
}
function App() {
  const [userData, setUserData] = useState({});
  function onError(err) {
    console.log(err)
  }
  function onSuccess(googleUser) {
    console.log(googleUser.getAuthResponse())
    console.log(googleUser.getBasicProfile())
    setUserData(googleUser.getBasicProfile())
  }
  useEffect(() => {
    fbLogIn = new FacebookLogin({
      appId: "320868815625915",
    }, onSuccess, onError)
  }, []);
  return (
    <div className="google">
      <div className="google-btn-signin" onClick={ handleSignin }>登录</div>
      {
        Object.keys(userData).length > 0 ?
          <div className="user-data">
            <p>{userData.Cd}</p>
            <img src={userData.fL} alt="avator" />
            <p>{userData.zu}</p>
          </div> : null
      }
    </div>
  );
}

export default App;
