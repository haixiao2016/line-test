/*
 * @Author: small
 * @Description: Line login 
 * @Date: 2020-08-13 17:28:20
 * @LastEditTime: 2020-08-14 10:16:33
 * @FilePath: /line-test/src/SDK/lineLogin.js
 */
import { getUrlParams } from "./common"
class LineLogin {
  constructor(options, onSuccess, onError) {
    this.liffId = options.liffId
    this.redirectUri = options.redirectUri
    this.onSuccess = onSuccess
    this.onError = onError
    this.ready = false
    this.init()
  }
  init() {
    if(window.liff) {
      this.InitLineButton()
      return true
    }
    const signInAPI = document.createElement('script')
    signInAPI.setAttribute('src', 'https://static.line-scdn.net/liff/edge/2/sdk.js')
    signInAPI.setAttribute('crossorigin', 'anonymous')
    signInAPI.setAttribute('async', true)
    signInAPI.setAttribute('defer', true)
    document.head.appendChild(signInAPI)
    signInAPI.onload = this.InitLineButton.bind(this)
  }
  InitLineButton() {
    window.liff.init({
      liffId: this.liffId
    }).then(_=> {
      this.ready = true
      this.checkHasCode()
    }).catch(err=> {
      this.ready = false
      this.onError(err)
    })
  }
  isReady() {
    return this.ready
  }
  checkHasCode() {
    const code = getUrlParams("code")
    const liffClientId = getUrlParams("liffClientId")
    if(code && liffClientId) {
      return this.onSuccess(window.liff.getAccessToken())
    }
  }
  login() {
    console.log("login")
    if(!this.isReady()) {
      return setTimeout(()=> this.login(), 100)
    }
    window.liff.login({
      redirectUri: this.redirectUri
    })
  }
}

export default LineLogin;