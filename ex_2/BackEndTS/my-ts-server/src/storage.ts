import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import {fileDirPath} from './config';

export let storage: multer.StorageEngine;
storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, fileDirPath);
    },
    filename: (_req, _file, callback) => {
        const ext: string = path.extname(_file.originalname);
        const safeName: string = `${uuidv4()}${ext}`;
        callback(null, safeName);
    },
});

export const upload = multer({storage});
