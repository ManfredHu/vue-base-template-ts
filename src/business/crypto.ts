const CryptoJS = require('crypto-js') // 引用AES源码js

const key = CryptoJS.enc.Utf8.parse('9332e331aa00083f') // 十六位十六进制数作为密钥

// 解密方法
export function Decrypt(word: String) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: '',
    mode: CryptoJS.mode.ECBm,
    padding: CryptoJS.pad.Pkcs7
  })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
export function Encrypt(word: String) {
  let encrypted = CryptoJS.AES.encrypt(word, key, {
    iv: '',
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString().toUpperCase()
}
