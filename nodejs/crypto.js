(function () {
    const crypto = require('crypto');
    const cipher = crypto.createCipher('aes192', 'a password');

    let encrypted = '';
    cipher.on('readable', () => {
        const data = cipher.read();
        if (data) {
            encrypted += data.toString('hex');
        }
    });
    cipher.on('end', () => {
        console.log(encrypted);
        // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
    });

    cipher.write('some clear text data');
    cipher.end();

})();

(() => {

})();