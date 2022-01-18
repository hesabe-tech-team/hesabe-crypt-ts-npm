# hesabe-crypt

> Encryption library for Hesabe Payment API 2.0

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm i -S hesabe-crypt
```

## Dependencies

A depency for this package `aes-js` will also get installed automatically and usage of that is shown below.

## Usage

After installing this library you may import the `Hesabe Crypt` class.

```bash
import {HesabeCrypt} from "hesabe-crypt-ts/lib"
```

You need to import `aes-js` also.

```bash
import aesjs from "aes-js";
```

You need to have a `secret` and an `iv code` to use this package.

Before starting encryption, you need to convert your `secret` and `iv` in bytes mentioned below:

```bash
const secret = 'XXXXX'        // Secret provided by Hesabe
const ivCode = 'XXXXX'        // IV provided by Hesabe

key = aesjs.utils.utf8.toBytes(secret);
iv = aesjs.utils.utf8.toBytes(ivKey);
```

You first need to initialise an intance of `hesabeCrypt` class and pass the `key` and `iv` while doing it.

```bash
let instance = new HesabeCrypt();
```

You can now call the methods of `hesabeCrypt`.

```bash
let text = 'XXXXX';           // Any random text
let encrypted = instance.encryptAes(text, key, iv);

let decrypted = instance.decryptAes(encrypted, key, iv);

```

[npm-image]: https://hesabe-assets.s3.me-south-1.amazonaws.com/Hesabe-Logo.png
[npm-url]: https://www.npmjs.com/package/hesabe-crypt
