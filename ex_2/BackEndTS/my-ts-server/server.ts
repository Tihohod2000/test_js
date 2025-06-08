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

app.post('/upload-file', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400)
        return;
    }
    //get uuid for file
    //save info by uuid

    const generatedLink = `http://localhost:${port}/download/${req.file.filename}`;

    res.status(200).json({link: generatedLink});
});

app.get('/download/:filename', (req: Request, res: Response) => {
    const filename = req.params.filename;
    const timestamp = parseInt(filename.split('_')[0]);

    if (!validTtlFile(timestamp, timeAlive)) {
        res.status(400).json({error: 'Not found file'})
    }

    const filePath = path.join(fileDirPath, filename);
    res.download(filePath);
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
});


