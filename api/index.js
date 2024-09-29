const https = require('https');

module.exports = (req, res) => {
    const { uid, code } = req.query;

    // تحقق من وجود uid و code
    if (!uid) {
        return res.status(400).json({ error: 'الرجاء توفير UID في الاستعلام.' });
    }
    if (!code) {
        return res.status(400).json({ error: 'الرجاء توفير code في الاستعلام.' });
    }

    // تحقق من صحة الكود
    if (code !== 'FADAI1900mp') {
        return res.status(403).json({ error: 'الوصول غير مصرح به.' });
    }

    const apiUrl = `https://likes.freefireinfo.site/api/me/${uid}?key=fadai_like`;

    https.get(apiUrl, (response) => {
        let data = '';

        // جمع البيانات
        response.on('data', (chunk) => {
            data += chunk;
        });

        // الانتهاء من استلام البيانات
        response.on('end', () => {
            res.status(200).json(JSON.parse(data));
        });
    }).on('error', (error) => {
        console.error('حدث خطأ:', error.message);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب.' });
    });
};
