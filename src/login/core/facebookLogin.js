/*
 * @Author: small
 * @Description: facebook login 类
 * @Date: 2020-08-13 14:03:42
 * @LastEditTime: 2020-08-13 14:49:58
 * @FilePath: /line-test/src/login/core/facebookLogin.js
 */
import { rendomKey } from "../utils/common"
import { FACEBOOK } from "../utils/const"
/**
 * facebook登录
 * @class FaceBookLogin
 * client_id: facebook 的项目id
 * redirect_uri: 回调地址
 */
class FaceBookLogin {
  constructor(options) {
    this.client_id = options.client_id
    this.redirect_uri = options.redirect_uri
  }
  login() {
    this.state = rendomKey(12)
    const url = `https://www.facebook.com/v8.0/dialog/oauth?
      client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&state=${FACEBOOK}_${this.state}&from=facebook`
    window.location.href = url
  }
}

export default FaceBookLogin;