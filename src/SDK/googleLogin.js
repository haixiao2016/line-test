/*
 * @Author: small
 * @Description: google login
 * @Date: 2020-08-13 18:02:17
 * @LastEditTime: 2020-08-14 11:48:34
 * @FilePath: /line-test/src/SDK/googleLogin.js
 */
class GoogleLogin {
  constructor(options, success, error) {
    this.client_id = options.client_id
    this.el = options.el
    this.success = success
    this.error = error
    this.ready = false
    this.init()
  }
  init() {
    if (window.gapi) {
      this.InitGoogleButton()
      return true
    }
    const googleSignInAPI = document.createElement('script')
    googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
    document.head.appendChild(googleSignInAPI)
    googleSignInAPI.onload = this.InitGoogleButton.bind(this)
  }
  InitGoogleButton() {
    console.log("SDK 加载完毕")
    const googleApi = window.gapi
    googleApi.load('auth2', () => {
      const auth2 = googleApi.auth2.init({
        client_id: this.client_id,
        cookiepolicy: 'single_host_origin'
      })
      auth2.attachClickHandler(this.el, {
        scope: 'profile email'
      }, this.success, this.error)
      this.ready = true
    })
  }
  logout() {
    
  }
}


export default GoogleLogin;