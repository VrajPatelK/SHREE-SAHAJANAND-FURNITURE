const qrcode = require('qrcode');

module.exports = {
    payment: (amount) => {
        const upiLink = `upi://pay?pa=${encodeURIComponent(process.env.upiId)}&pn=${encodeURIComponent(process.env.payeeName)}&tr=${encodeURIComponent(process.env.transactionId)}&tn=${encodeURIComponent(process.env.transactionNote)}&am=${encodeURIComponent(amount)}&cu=${encodeURIComponent(process.env.currencyCode)}`;

        const { promisify } = require('util');
        const options = {
            errorCorrectionLevel: 'H',
            margin: 1,
            scale: 10,
        };
        const toBuffer = promisify(qrcode.toBuffer);
        return toBuffer(upiLink, options)
            .then(buffer => {
                const base64 = buffer.toString('base64');
                const imgSrc = `data:image/png;base64,${base64}`;
                return imgSrc;
            })
            .catch(err => {
                console.error(err);
                throw err;
            });
    }
};
