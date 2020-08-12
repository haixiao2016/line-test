function rendomData(e) {
  const je = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var t = "", n = 0; n < e; n++) t += je[Math.floor(Math.random() * je.length)];
  return t
}

class FaceBookLogin {
  constructor(options) {
    this.client_id = options.client_id
    this.redirect_uri = options.redirect_uri
    
  }
  init() {

  }
  login() {
    this.state = rendomData(12)
    const url = `https://www.facebook.com/v8.0/dialog/oauth?
      client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&state=facebook_${this.state}&from=facebook`
    window.location.href=url
  }
}

export default FaceBookLogin;