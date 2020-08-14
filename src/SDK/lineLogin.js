/*
 * @Author: small
 * @Description: Line login 
 * @Date: 2020-08-13 17:28:20
 * @LastEditTime: 2020-08-14 11:02:25
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
    if (window.liff) {
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
    console.log("SDK 加载完毕，初始化进行中")
    window.liff.init({
      liffId: this.liffId
    }).then(_ => {
      console.log("初始化成功")
      this.ready = true
      this.checkHasCode()
    }).catch(err => {
      console.log("初始化失败")
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
    if (code && liffClientId) {
      return this.onSuccess(window.liff.getAccessToken())
    }
  }
  login() {
    if (!this.isReady()) {
      console.log("SDK 未加载完毕， 0.1s之后重试")
      return setTimeout(() => this.login(), 100)
    }
    window.liff.login({
      redirectUri: this.redirectUri
    })
  }
}

export default LineLogin;