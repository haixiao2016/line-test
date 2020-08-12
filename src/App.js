import React, { useEffect } from 'react';
import './App.css';
import FacebookLogin from './facebookLogin'
let fbLogIn;


function handleSignin() {
  fbLogIn.login()
}
function App() {
  function onError(err) {
    console.log(err)
  }
  function onSuccess(googleUser) {
    console.log(googleUser.getAuthResponse())
    console.log(googleUser.getBasicProfile())
  }
  useEffect(() => {
    fbLogIn = new FacebookLogin({
      appId: "320868815625915",
    }, onSuccess, onError)
  }, []);
  return (
    <div className="google">
      <div className="google-btn-signin" onClick={ handleSignin }>登录</div>
    </div>
  );
}

export default App;
