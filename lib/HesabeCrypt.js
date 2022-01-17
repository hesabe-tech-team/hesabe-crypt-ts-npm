"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HesabeCrypt = void 0;
const aes_ts_1 = require("aes-ts");
class HesabeCrypt {
    encryptAes(txt, key, iv) {
        let paddedTxt = this.pkcs5Pad(txt);
        // let aesCbc = new aests.ModeOfOperation.cbc(this.key, this.iv);
        let aesCbc = new aes_ts_1.CBCEncryptor(key, iv);
        return aesCbc.encrypt(paddedTxt);
    }
    decryptAes(encHex, key, iv) {
        // let aesCbc = new aests.ModeOfOperation.cbc(this.key, this.iv);
        let aesCbc = new aes_ts_1.CBCDecryptor(key, iv);
        let decBytes = aesCbc.decrypt(encHex);
        return this.pkcs5Strip(decBytes);
    }
    pkcs5Pad(txt) {
        let blockSize = 32;
        let padLen = blockSize - (txt.length % blockSize);
        return txt + this.strRepeat(String.fromCharCode(padLen), padLen);
    }
    pkcs5Strip(txt) {
        let padChar = txt.charAt(txt.length - 1);
        let i = txt.indexOf(padChar);
        let strippedTxt = txt.substr(0, i);
        return strippedTxt;
    }
    strRepeat(input, multiplier) {
        // eslint-disable-line camelcase
        let y = "";
        while (true) {
            if (multiplier & 1) {
                y += input;
            }
            multiplier >>= 1;
            if (multiplier) {
                input += input;
            }
            else {
                break;
            }
        }
        return y;
    }
}
exports.HesabeCrypt = HesabeCrypt;
