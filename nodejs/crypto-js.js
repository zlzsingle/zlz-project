(function () {
    let SHA256 = require("crypto-js/sha256");
    console.log(SHA256("Message"));
})();


var crypto = require('crypto');
//加密
  function encrypt(str,secret){
    var cipher = crypto.createCipher('aes192',secret);
    var enc = cipher.update(str,'utf8','hex');
    enc += cipher.final('hex');

    return enc;
  }

//解密
  function decrypt(str,secret){
    var decipher = crypto.createDecipher('aes192',secret);
    var dec = decipher.update(str,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  }