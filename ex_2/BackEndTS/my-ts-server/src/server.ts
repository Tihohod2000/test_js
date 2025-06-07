import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import cron from 'node-cron';




const fileDirPath = process.cwd() + '/uploads';
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, fileDirPath);
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const safeName = `${Date.now()}_${uuidv4()}${ext}`;
        callback(null, safeName);
    },
});
const timeAlive: number = Number(process.env.TIME_ALIVE || 30) * 1000 * 60;

const upload = multer({ storage });

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

app.put('/upload-file', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400)
        return;
    }
    const generatedLink = `http://localhost:${port}/download/${req.file.filename}`;

    res.status(200).json({ link: generatedLink });
});

app.get('/download/:filename', (req: Request, res: Response) => {
    const filename = req.params.filename;
    const timestamp = parseInt(filename.split('_')[0]);

    if (!validTtlFile(timestamp, timeAlive)) {
        res.status(400).json({ error: 'link expired' })
    }

    const filePath = path.join(fileDirPath, filename);
    res.download(filePath);
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
});

function validTtlFile(timestamp: number, ttl: number) {
    return (Date.now() - timestamp) < ttl;
}
