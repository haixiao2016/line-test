/* eslint-disable no-undef */
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
      appId            : this.appId,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v8.0'
    })
  }
  getLoginStatus() {
    let _this = this
    return new Promise((resolve)=> {
      FB.getLoginStatus(function(response) {
        resolve(response.status)
        if(response.status === "connected") {
          _this.success(response.authResponse)
        }
      })
    })
  }
  async login() {
    const status = await this.getLoginStatus()
    if( status === "connected") return false;
    let _this = this
    FB.login(function(response) {
      if (response.authResponse) {
        _this.success(response.authResponse)
      } else {
        _this.error()
       console.log('User cancelled login or did not fully authorize.');
      }
  });
  }
}

export default FacebookLogin;