"use strict";

import * as aests from "./../node_modules/aes-ts/src/utils";
import { CBCEncryptor, CBCDecryptor, Block } from "aes-ts";

class HesabeCrypt {
  iv: any;
  key: any;

  constructor(secret: String, iv: String) {
    this.key = secret;
    this.iv = iv;
  }

  encryptAes(txt: String) {
    let paddedTxt = this.pkcs5Pad(txt);
    let txtBytes = aests.utils.utf8.toBytes(paddedTxt);

    // let aesCbc = new aests.ModeOfOperation.cbc(this.key, this.iv);
    let aesCbc = new CBCEncryptor(this.key, this.iv);
    let encBytes = aesCbc.encrypt(txtBytes);

    let encHex = aests.utils.hex.fromBytes(encBytes);
    return encHex;
  }

  decryptAes(encHex: String) {
    let encBytes = aests.utils.hex.toBytes(encHex);

    // let aesCbc = new aests.ModeOfOperation.cbc(this.key, this.iv);
    let aesCbc = new CBCDecryptor(this.key, this.iv);
    let decBytes = aesCbc.decrypt(encBytes);

    let decTxt = aests.utils.utf8.fromBytes(decBytes);
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
