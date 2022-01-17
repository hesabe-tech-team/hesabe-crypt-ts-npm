"use strict";

import { CBCEncryptor, CBCDecryptor, Block } from "aes-ts";

export class HesabeCrypt {
  iv: any;
  key: any;

  encryptAes(txt: String) {
    let paddedTxt: any = this.pkcs5Pad(txt);

    // let aesCbc = new aests.ModeOfOperation.cbc(this.key, this.iv);
    let aesCbc = new CBCEncryptor(this.key, this.iv);
    return aesCbc.encrypt(paddedTxt);
  }

  decryptAes(encHex: any) {
    // let aesCbc = new aests.ModeOfOperation.cbc(this.key, this.iv);
    let aesCbc = new CBCDecryptor(this.key, this.iv);
    let decBytes: any = aesCbc.decrypt(encHex);

    return this.pkcs5Strip(decBytes);
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
