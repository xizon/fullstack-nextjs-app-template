
import privateKey from '../../config/jwt';

/**
 * JWT
 */
const JWT_SECRET = privateKey;
const JWT_EXPIRES_IN = 3600 * 24 * 2;


const sign = (payload, privateKey, header) => {
    let res = null;
    try {
        const now = new Date();
        header.expiresIn = new Date(now.getTime() + header.expiresIn);
        const encodedHeader = btoa(JSON.stringify(header));
        const encodedPayload = btoa(JSON.stringify(payload));
        const signature = btoa(
            Array.from(encodedPayload)
                .map((item, key) =>
                    String.fromCharCode(
                        item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)
                    )
                )
                .join('')
        );
        res = `${encodedHeader}.${encodedPayload}.${signature}`;

    } catch (e) {}


    return res;
};

const decode = (token) => {
    let payload = null;
    try {
        const [encodedHeader, encodedPayload, signature] = token.split('.');
        const header = JSON.parse(atob(encodedHeader));
        payload = JSON.parse(atob(encodedPayload));
        const now = new Date();

        if (now < header.expiresIn) {
            throw new Error('Expired token');
        }

        const verifiedSignature = btoa(
            Array.from(encodedPayload)
                .map((item, key) =>
                    String.fromCharCode(
                        item.charCodeAt(0) ^ JWT_SECRET[key % JWT_SECRET.length].charCodeAt(0)
                    )
                )
                .join('')
        );


        if (verifiedSignature !== signature) {
            throw new Error('Invalid signature');
        }

    } catch (e) {}


    return payload;
};

const verify = (token, privateKey) => {
    let payload = null;
    try {
        const [encodedHeader, encodedPayload, signature] = token.split('.');
        const header = JSON.parse(atob(encodedHeader));
        payload = JSON.parse(atob(encodedPayload));
        const now = new Date();

        if (now < header.expiresIn) {
            throw new Error('The token is expired!');
        }

        const verifiedSignature = btoa(
            Array.from(encodedPayload)
                .map((item, key) =>
                    String.fromCharCode(
                        item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)
                    )
                )
                .join('')
        );


        if (verifiedSignature !== signature) {
            throw new Error('The signature is invalid!');
        }
    } catch (e) {}


    return payload;
};


export {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    sign,
    decode,
    verify
};
