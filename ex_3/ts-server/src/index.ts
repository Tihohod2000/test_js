import express, { Request, Response } from 'express';
import cors from "cors";
import {port} from "./config";

import multer from 'multer';
import {searchCity} from "./searchCity";

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript');
});

app.get('/weather', upload.none(), async (req: Request, res: Response) => {
    const city = req.query.city;
    if (!city){
        res.status(400).send("Город не указан");
    }else{
        res.json(await searchCity(city.toString()));

    }
    // console.log(city);
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
});