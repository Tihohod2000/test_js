import express, { Request, Response } from 'express';
import {redis} from "./redis";

import multer from 'multer';
import {searchCity} from "./searchCity";

const app = express();
const upload = multer();
const PORT = 3000;
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript');
});

app.get('/weather', upload.none(), async (req: Request, res: Response) => {
    const city = req.query.city;
    if (!city){
        res.status(400).send("Город не указан");
    }else{
    res.json(city);
    await searchCity(city.toString());



    }
    console.log(city);
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});