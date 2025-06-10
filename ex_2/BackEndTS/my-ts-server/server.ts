import express, {Request, Response} from 'express';
import path from 'path';
import cors from 'cors';
import './src/cron';
import {port, fileDirPath} from './src/config';
import {upload} from "./src/storage";
import {redis} from "./src/redis"

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

    const key: string = `file:${req.file.filename.split('.')[0]}`;

    await redis.set(key, JSON.stringify(uploadFile));

    const generatedLink = `http://localhost:${port}/download/file:${req.file.filename}`;

    res.status(200).json({link: generatedLink});
});

app.get('/download/:filename', async (req: Request, res: Response) => {
    const filename: string = req.params.filename.split(':')[1];
    const keyOfFile: string = req.params.filename.split('.')[0];

    const obj: string = (await redis.get(keyOfFile)) || "";

    if (obj) {
        const jsonObj = JSON.parse(obj);
        jsonObj.updateAt = Date.now();
        await redis.set(keyOfFile, JSON.stringify(jsonObj));
    }
    console.log(filename);

    const filePath: string = path.join(fileDirPath, filename);
    res.download(filePath);
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
});


