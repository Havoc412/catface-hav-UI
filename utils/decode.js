// 假设encryptedData与iv为从微信接口获取
const CryptoJS = require("crypto-js");
const encryptedData =
  "uth1OixaB1J7AO/bWBL1TCjXcEyVQmlL6I6c4CEtUL1hrCWYOWjFNJ88L7+jNS/yR9AgH4wDnLTRe6HJ0O9Cd8xMjdBSDRNMXVONeG2cN6deKdPZJom17BkWrHYBMS4QPs0JISA3pImBaX/c3wnl7EGCK2RnkiYfqffgk5+wUcnxtTeE2p/2Fb+5VcL0MOIPZiiV0iCC/JoJBoeh+v+RXxwvEpZ73zf8Em5aZztj4ncFYWRbECA9eFLf3QJWPZv9M01cbTYGSQKPmcoYMTw5wqdTSE89Qih4Z+bU2ZYqnuX++sqAeO7g169IBIyLcMmuRrekPGWDBsALrXfRpX2syjEMojRD78OsqbaCgVBTjCey3low4xv34tE+VD5Mp9tSdLhqi+PSEUsCQmLGdSMmMSfPqP2z06rkG8XuYsyG6hr8PmavXziRIKRav/eppwcix5xWzwBDU3xKSC7Bpdsdyw==";
console.log(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(encryptedData))); // 应该输出 encryptedData
// const sessionKey = new CryptoJS.enc.Hex.parse(this.globalData.session_key);
const iv = new CryptoJS.enc.Utf8.parse("OkpFe43Uf5sFMiDsi3XMAw==");
console.log(iv.words.length);
const sessionKey = new CryptoJS.enc.Utf8.parse("O2TWHcEzxwtB0CFRzUI1tQ==");
console.log(sessionKey.words.length); 


// 解密
const decipher = CryptoJS.AES.decrypt(
  {
    ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  },
  sessionKey
);
const decrypted = decipher.toString(CryptoJS.enc.Utf8);
console.log("解密后的用户信息:", decrypted);
