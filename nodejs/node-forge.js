const crypto = require('crypto');
const fs = require('fs');
const querystring = require('querystring');
const forge = require('node-forge');

function sign(params) {

    const  unionpay = {
        uri: 'https://xxxxx.xxxxx.xxxxx.com',
        version: '5.1.0',
        signMethod: '01',
        frontUrl: 'https://xxxxx-xxxxx.xxxxx.com/',
        backUrl: 'https://xxxxx-xxxxx-xxxxx.xxxxx.com/',
        merId: '000000000000000',
        pfx: {
            path: '/xxxxx.pfx',
            password: '000000',
        },
    };


    const data = fs.readFileSync(unionpay.pfx.path);
    const p12b64 = Buffer.from(data).toString('base64');

    const p12Der = forge.util.decode64(p12b64);
    const p12Asn1 = forge.asn1.fromDer(p12Der);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, unionpay.pfx.password);

    const keyData = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag]
        .concat(p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]);
    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];

    const cert = certBags[0].cert;
    const privateKey = keyData[0].key;
    const pem = forge.pki.privateKeyToPem(privateKey);

    // 加入签名序列号
    params.certId = parseInt(cert.serialNumber, 16);

    // 参数排序
    const sortedParams = {};
    const keys = Object.keys(params);
    keys.sort().forEach(key => {
        sortedParams[key] = params[key];
    });
    const paramsString = querystring.stringify(sortedParams, '&', '=', {
        encodeURIComponent: str => str,
    });
    const hash = crypto.createHash('sha256').update(paramsString).digest('hex');

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(hash);
    sign.end();
    params.signature = sign.sign(pem, 'base64');

    return params;
}
