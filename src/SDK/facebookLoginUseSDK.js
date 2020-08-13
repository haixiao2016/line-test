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
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log(response.authResponse)
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token 
        // and signed request each expire.
      } else if (response.status === 'not_authorized') {
        // The user hasn't authorized your application.  They
        // must click the Login button, or you must call FB.login
        // in response to a user gesture, to launch a login dialog.
      } else {
        // The user isn't logged in to Facebook. You can launch a
        // login dialog with a user gesture, but the user may have
        // to log in to Facebook before authorizing your application.
      }
     });
  }
  login() {
    this.getLoginStatus()
    FB.login(function(response) {
      if (response.authResponse) {
        console.log(response.authResponse)
       console.log('Welcome!  Fetching your information.... ');
       // eslint-disable-next-line no-undef
       FB.api('/me', function(response) {
         console.log(response)
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  });
  }
}

export default FacebookLogin;