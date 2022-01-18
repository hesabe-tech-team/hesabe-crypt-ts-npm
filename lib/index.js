"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HesabeCrypt = void 0;
const aesjs = require("aes-js");
class HesabeCrypt {
    encryptAes(txt, key, iv) {
        let paddedTxt = this.pkcs5Pad(txt);
        let txtBytes = aesjs.utils.utf8.toBytes(paddedTxt);
        let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
        let encBytes = aesCbc.encrypt(txtBytes);
        let encHex = aesjs.utils.hex.fromBytes(encBytes);
        return encHex;
    }
    decryptAes(encHex, key, iv) {
        let encBytes = aesjs.utils.hex.toBytes(encHex);
        let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
        let decBytes = aesCbc.decrypt(encBytes);
        let decTxt = aesjs.utils.utf8.fromBytes(decBytes);
        let strippedTxt = this.pkcs5Strip(decTxt);
        return strippedTxt;
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
