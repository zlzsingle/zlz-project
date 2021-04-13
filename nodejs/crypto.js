import { createCipheriv, createDecipheriv } from "crypto";

// AES-128-CBC 是一种分组对称加密算法

class CryptoUtils {
	/**
	 * 字符创加密
	 * @param str 要解密的字符串
	 */
	static encryptString(str) {
		const aesCode = '1234567890123456';
		const key = Buffer.from(aesCode, 'utf8');
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
		const aesCode = '1234567890123456';
		const key = Buffer.from(aesCode, 'utf8');
		const cipheriv = createDecipheriv('aes128', key, key);
		const one = cipheriv.update(str, 'hex', 'utf8');
		const two = cipheriv.final('utf8');
		return one + two;
	}

	static signParams(text, algorithm) {
		// RSA-SHA512
		const rsaPrivate = '<私钥>.pem';
		const pk = crypto.createPrivateKey({
			key: rsaPrivate,
			format: 'pem',
		});

		const toSignParams = {};
		const paramKeys = Object.keys(params).sort();

		paramKeys.forEach((key) => {
			toSignParams[key] = params[key];
		});

		// const sign = crypto.createSign('SHA512WithRSA');
		// const sign = crypto.createSign('RSA-SHA512');
		// const text = querystring.stringify(toSignParams, '&', '=', {
		// 	encodeURIComponent: (str) => str,
		// });
		const sign = crypto.createSign(algorithm);
		sign.update(text);
		return sign.sign(pk, 'base64');
	}

	static verifySign(text, signature, algorithm) {
		const rsaPublic = '<公钥>.pen'
		const pk = crypto.createPublicKey({
			key: rsaPublic,
			format: 'pem',
		});
		// const verify = crypto.createVerify('RSA-SHA512');
		const verify = crypto.createVerify(algorithm);
		verify.update(text);
		return verify.verify(pk, signature, 'base64');
	}
}
