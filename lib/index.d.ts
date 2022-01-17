export declare class HesabeCrypt {
    iv: any;
    key: any;
    encryptAes(txt: String): Uint8Array;
    decryptAes(encHex: any): string;
    pkcs5Pad(txt: String): string;
    pkcs5Strip(txt: String): string;
    strRepeat(input: any, multiplier: any): string;
}
