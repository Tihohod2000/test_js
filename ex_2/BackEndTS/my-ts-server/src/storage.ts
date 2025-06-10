import multer from 'multer';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import {fileDirPath} from './config';

export let storage: multer.StorageEngine;
storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, fileDirPath);
    },
    filename: (req, file, callback) => {
        const ext: string = path.extname(file.originalname);
        const safeName: string = `${uuidv4()}${ext}`;
        callback(null, safeName);
    },
});

export const upload = multer({storage});
