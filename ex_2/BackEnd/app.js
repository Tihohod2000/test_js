const express = require('express');
const app = express();
const port = 3000;

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.put('/upload-file', (req, res) => {
    //Загрузка файла
    //Генерация ссылки
    //return
    // req.body.file = req.files[0];
    console.log(res.files);
    console.log(1);
    res.status(200).json({ link: 'link' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});