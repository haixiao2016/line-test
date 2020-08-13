/*
 * @Author: small
 * @Description: 
 * @Date: 2020-08-13 17:41:57
 * @LastEditTime: 2020-08-13 17:42:06
 * @FilePath: /line-test/src/SDK/common.js
 */
export const getUrlParams = (queryName) => {
  const reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  } else {
    return null
  }
}