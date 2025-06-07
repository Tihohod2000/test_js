import express from 'express';

const app = express();
const PORT = 3000;

// Встроенный middleware для парсинга JSON
app.use(express.json());

app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    console.log('Получены данные:', receivedData);
    // console.log('Получены данные:', req);

    res.json({ message: 'Данные успешно получены', data: receivedData });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});