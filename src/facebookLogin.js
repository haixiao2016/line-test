/* eslint-disable no-undef */
/*
 * @Author: small
 * @Description: facebook login 
 * @Date: 2020-08-12 16:51:12
 * @LastEditTime: 2020-08-12 17:11:36
 * @FilePath: /signin-demo/src/facebookLogin.js
 */
class FacebookLogin {
  constructor(options, success, error) {
    this.appId = options.appId
    this.el = options.el
    this.success = success
    this.error = error
    this.init()
  }
  init() {
    const facebookSignInAPI = document.createElement('script')
    facebookSignInAPI.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js')
    facebookSignInAPI.setAttribute('crossorigin', 'anonymous')
    facebookSignInAPI.setAttribute('async', true)
    facebookSignInAPI.setAttribute('defer', true)
    document.head.appendChild(facebookSignInAPI)
    facebookSignInAPI.onload = this.InitFacebookButton.bind(this)
  }
  InitFacebookButton() {
    FB.init({
      appId            : 'your-app-id',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v8.0'
    })
  }

  login() {
    FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       // eslint-disable-next-line no-undef
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  });
  }
}

export default FacebookLogin;