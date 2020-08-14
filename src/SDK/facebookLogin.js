class FacebookLogin {
  constructor(options, success, error) {
    this.appId = options.appId
    this.el = options.el
    this.success = success
    this.error = error
    this.ready = false
    this.init()
  }
  init() {
    if (window.FB) {
      this.InitFacebookButton()
      return true
    }
    const facebookSignInAPI = document.createElement('script')
    facebookSignInAPI.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js')
    facebookSignInAPI.setAttribute('crossorigin', 'anonymous')
    facebookSignInAPI.setAttribute('async', true)
    facebookSignInAPI.setAttribute('defer', true)
    document.head.appendChild(facebookSignInAPI)
    facebookSignInAPI.onload = this.InitFacebookButton.bind(this)
  }

  InitFacebookButton() {
    console.log("SDK 加载完毕")
    window.FB.init({
      appId: this.appId,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v8.0'
    })
    console.log("初始化成功")
    this.ready = true
  }
  isReady() {
    return this.ready
  }
  getLoginStatus() {
    let _this = this
    return new Promise((resolve) => {
      window.FB.getLoginStatus(function (response) {
        resolve(response.status)
        if (response.status === "connected") {
          _this.success(response.authResponse)
        }
      })
    })
  }
  async login() {
    if (!this.isReady()) {
      console.log("SDK 未加载完毕， 0.1s之后重试")
      return setTimeout(() => this.login(), 100)
    }
    console.log("login 登录校验中----")
    const status = await this.getLoginStatus()
    console.log(status)
    if (status === "connected") return false;
    console.log("手动登录 --- 跳转到登录页面")
    let _this = this
    window.FB.login(function (response) {
      if (response.authResponse) {
        _this.success(response.authResponse)
      } else {
        _this.error()
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'email'});
  }
  logout(cb) {
    window.FB.logout(function(response) {
      cb && cb(response)
    });
  }
}

export default FacebookLogin;