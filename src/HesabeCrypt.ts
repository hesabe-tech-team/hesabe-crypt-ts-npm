"use strict";

import * as aesjs from "aes-js";

export class HesabeCrypt {

  encryptAes(txt: String, key: any, iv: any) {
    let paddedTxt = this.pkcs5Pad(txt);
    let txtBytes = aesjs.utils.utf8.toBytes(paddedTxt);

    let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    let encBytes = aesCbc.encrypt(txtBytes);

    let encHex = aesjs.utils.hex.fromBytes(encBytes);
    return encHex;
  }

  decryptAes(encHex: any, key: any, iv: any) {
    let encBytes = aesjs.utils.hex.toBytes(encHex);
    let aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    let decBytes = aesCbc.decrypt(encBytes);
    let decTxt = aesjs.utils.utf8.fromBytes(decBytes);
    let strippedTxt = this.pkcs5Strip(decTxt);
    return strippedTxt;
  }

  pkcs5Pad(txt: String) {
    let blockSize = 32;
    let padLen = blockSize - (txt.length % blockSize);
    return txt + this.strRepeat(String.fromCharCode(padLen), padLen);
  }

  pkcs5Strip(txt: String) {
    let padChar = txt.charAt(txt.length - 1);
    let i = txt.indexOf(padChar);
    let strippedTxt = txt.substr(0, i);
    return strippedTxt;
  }

  strRepeat(input: any, multiplier: any) {
    // eslint-disable-line camelcase
    let y = "";
    while (true) {
      if (multiplier & 1) {
        y += input;
      }
      multiplier >>= 1;
      if (multiplier) {
        input += input;
      } else {
        break;
      }
    }
    return y;
  }
}
