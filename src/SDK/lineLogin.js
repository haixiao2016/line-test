/* eslint-disable no-unused-expressions */
/*
 * @Author: small
 * @Description: Line login 
 * @Date: 2020-08-13 17:28:20
 * @LastEditTime: 2020-08-13 18:55:17
 * @FilePath: /line-test/src/SDK/lineLogin.js
 */
/* eslint-disable no-undef */
import { getUrlParams } from "./common"
class LineLogin {
  constructor(options, onSuccess, onError) {
    this.liffId = options.liffId
    this.redirectUri = options.redirectUri
    this.onSuccess = onSuccess
    this.onError = onError
    this.init()
  }
  init() {
    const signInAPI = document.createElement('script')
    signInAPI.setAttribute('src', 'https://static.line-scdn.net/liff/edge/2/sdk.js')
    signInAPI.setAttribute('crossorigin', 'anonymous')
    signInAPI.setAttribute('async', true)
    signInAPI.setAttribute('defer', true)
    document.head.appendChild(signInAPI)
    signInAPI.onload = this.InitLineButton.bind(this)
  }
  InitLineButton() {
    liff.init({
      liffId: this.liffId
    }).then(_=> {
      this.checkHasCode()
    })
  }
  checkHasCode() {
    const code = getUrlParams("code")
    const liffClientId = getUrlParams("liffClientId")
    if(code && liffClientId) {
      return this.onSuccess(liff.getAccessToken())
    }
  }
  login() {
    liff.login({
      redirectUri: this.redirectUri
    })
  }
}

export default LineLogin;