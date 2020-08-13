/*
 * @Author: small
 * @Description: login index 
 * @Date: 2020-08-13 13:59:00
 * @LastEditTime: 2020-08-13 14:25:52
 * @FilePath: /line-test/src/login/index.js
 */
import FacebookLogin from "./core/facebookLogin";
import { getUrlParams } from "./utils/common";
import * as types from "./utils/const";
const getUrlCode = () => {
  const code = getUrlParams("code")
  let state = getUrlParams("state")
  if(state) {
    state = state.split("_")[0]
  }
  return { 
    code,
    type: Object.keys(types).find(v=> types[v] === state)
  }
}

export {
  FacebookLogin,
  getUrlCode,
}