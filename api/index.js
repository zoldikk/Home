const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ error: 'الرجاء توفير UID في الاستعلام.' });
    }

    const apiUrl = `https://likes.freefireinfo.site/api/me/${uid}?key=fadai_like`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('حدث خطأ:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب.' });
    }
};
