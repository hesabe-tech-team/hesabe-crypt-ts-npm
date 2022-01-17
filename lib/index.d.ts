export declare class HesabeCrypt {
    encryptAes(txt: String, key: any, iv: any): Uint8Array;
    decryptAes(encHex: any, key: any, iv: any): string;
    pkcs5Pad(txt: String): string;
    pkcs5Strip(txt: String): string;
    strRepeat(input: any, multiplier: any): string;
    string2bytes(input: string): string;
}
