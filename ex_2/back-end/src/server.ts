import express, {Request, Response} from 'express';
import cors from 'cors';
import './cron';
import {port} from './config';
import {upload} from "./storage";
import {downloadFile} from "./downloadFile";
import {uploadFile} from "./uploadFile";
import {getStatistics} from "./statistics";

const app = express();
app.use(cors());

app.post('/upload-file', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400)
        return;
    }

    const uploadFileObj = {
        oroginalName: req.file.originalname,
        uuid: req.file.filename.split('.')[0],
        path: `${req.file.filename}`,
        createdAt: Date.now(),
        updateAt: Date.now(),
        countDownload: 0
    }
    // console.log(uploadFileObj);


    const [generatedLink, statistics] = await Promise.all([uploadFile(uploadFileObj), getStatistics()]);
    res.status(200).json(
        {
            link: generatedLink,
            statistics: statistics
        }
        );
});

app.get('/download/:filename', async (req: Request, res: Response) => {
    const filename: string = req.params.filename.split(':')[1];
    const keyOfFile: string = req.params.filename.split('.')[0];
    const [filePath, originalName] = await downloadFile(filename, keyOfFile);
    res.download(filePath, originalName);
});

app.listen(port, () => {
    console.log(`✅ Сервер запущен: http://localhost:${port}`);
});


