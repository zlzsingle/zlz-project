import * as config from 'config';
import {createCipheriv, createDecipheriv} from "crypto";

class cryptoUtils {
    /**
     * 字符创加密
     * @param str 要解密的字符串
     */
    static encryptString(str) {
        const saltCode = config.get('saltCode');
        const key = Buffer.from(saltCode, 'utf8');
        const cipheriv = createCipheriv('aes-128-cbc', key, key);
        const one = cipheriv.update(str, 'utf8', 'hex');
        const two = cipheriv.final('hex');
        return one + two;
    }

    /**
     * 字符串解密
     * @param str 加密过后的字符串
     */
    static decryptString(str) {
        const saltCode = config.get('saltCode');
        const key = Buffer.from(saltCode, 'utf8');
        const cipheriv = createDecipheriv('aes128', key, key);
        const one = cipheriv.update(str, 'hex', 'utf8');
        const two = cipheriv.final('utf8');
        return one + two;
    }
}
