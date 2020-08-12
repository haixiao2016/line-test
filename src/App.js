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
  function onSuccess(data) {
    console.log(data)
  }
  useEffect(() => {
    fbLogIn = new FacebookLogin({
      client_id: "320868815625915",
      redirect_uri: "https://www.haixiao.online"
    }, onSuccess, onError)
  }, []);
  return (
    <div className="google">
      <div className="google-btn-signin" onClick={ handleSignin }>登录</div>
    </div>
  );
}

export default App;
