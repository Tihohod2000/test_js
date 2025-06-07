import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import { fileDirPath, timeAlive } from './config';
import { validTtlFile } from './utils';

cron.schedule('*/5 * * * *', () => {
    console.log('Запуск cron-задачи');

    const files = fs.readdirSync(fileDirPath);
    let deleted = 0;

    for (const file of files) {
        const timestamp = parseInt(file.split('_')[0]);
        if (!validTtlFile(timestamp, timeAlive)) {
            fs.unlinkSync(path.join(fileDirPath, file));
            console.log(`Удалён файл: ${file}`);
            deleted++;
        }
    }

    console.log(`Удалено файлов: ${deleted}`);
});
