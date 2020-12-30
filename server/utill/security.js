const crypto = require('crypto');

module.exports = {

    // 이메일 인증 암호화 알고리즘_ 다래 
    Cipher: async (data, key) => {
        console.log(data)
        const cipher = crypto.createCipher('aes-256-cbc', key);
        let cipherText = cipher.update(data, 'utf8', 'base64');
        cipherText += cipher.final('base64');
        return cipherText;
    },

    // 이메일 인증 복호화 알고리즘_ 다래 
    DeCipher: async (data, key) => {
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let DecipherText = decipher.update(data, 'base64', 'utf8');
        DecipherText += decipher.final('utf8');
        return DecipherText;
    },
}