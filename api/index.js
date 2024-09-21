const axios = require('axios');

module.exports = async (req, res) => {
    const { uid } = req.query;

    if (!uid) {
        return res.status(400).json({ error: 'الرجاء توفير UID في الاستعلام.' });
    }

    const apiUrl = `https://likes.freefireinfo.site/api/me/${uid}?key=fadai_like`;

    try {
        const response = await axios.get(apiUrl);

        // التأكد من أن البيانات موجودة
        if (!response.data) {
            return res.status(404).json({ error: 'لم يتم العثور على بيانات.' });
        }

        res.status(200).json(response.data);
    } catch (error) {
        console.error('حدث خطأ:', error.message);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب.' });
    }
};
