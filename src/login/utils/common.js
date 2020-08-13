/*
 * @Author: small
 * @Description: 通用的方法
 * @Date: 2020-08-13 13:59:42
 * @LastEditTime: 2020-08-13 14:12:58
 * @FilePath: /line-test/src/login/utils/common.js
 */

/**
 * 随机字符串生成
 * @export 
 * @param {number} e 长度
 * @returns string
 */
export function rendomKey(e) {
  const keys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var t = "", n = 0; n < e; n++) t += keys[Math.floor(Math.random() * keys.length)];
  return t
}


// 获取 url 参数信息
export const getUrlParams = (queryName) => {
  const reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}