const CryptoJS = require('crypto-js')

const ivSpec = CryptoJS.enc.Utf8.parse('1111333300002222')

export const encrypt = (parseString, token) => {
  let _parseString = CryptoJS.enc.Utf8.parse(parseString);
  let key = CryptoJS.enc.Utf8.parse(token);
  const encrypted = CryptoJS.AES.encrypt(_parseString, key, {
    iv: ivSpec,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}