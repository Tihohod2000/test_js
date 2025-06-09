import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import path from 'path';
import cors from 'cors';
import {port, fileDirPath, timeAlive} from './src/config';
import {upload} from "./src/storage";
import './src/cron';
import {validTtlFile} from "./src/utils";
import {redis} from "./src/redis"



dotenv.config();

const app = express();
app.use(cors());

app.post('/upload-file', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400)
        return;
    }

    const uploadFile = {
        uuid: req.file.filename.split('.')[0],
        path: `${req.file.filename}`,
        createdAt: Date.now(),
        updateAt: Date.now(),
        countDownload: 0
    }

    await redis.set(`file:${req.file.filename.split('.')[0]}`, JSON.stringify(uploadFile));

    const generatedLink = `http://localhost:${port}/download/file:${req.file.filename}`;

    res.status(200).json({link: generatedLink});
});

app.get('/download/:filename', async (req: Request, res: Response)  =>  {
    const filename = req.params.filename.split(':')[1];
    const keyOfFile = req.params.filename.split('.')[0];

    const obj = await redis.get(keyOfFile);

    if(obj !== null) {
        const jsonObj = JSON.parse(obj);
        jsonObj.updateAt = Date.now();
        await redis.set(keyOfFile, JSON.stringify(jsonObj));
    }
    console.log(filename);

    const filePath = path.join(fileDirPath, filename);
    res.download(filePath);
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
});


