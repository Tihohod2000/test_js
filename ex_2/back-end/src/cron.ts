import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import {fileDirPath, timeAlive} from './config';
import {redis} from "./redis"


cron.schedule('*/1 * * * *', async () => {
    console.log('Запуск cron-задачи');

    let deleted: number = 0;
    const files: string[] = fs.readdirSync(fileDirPath);

    for (let file of files) {
        const key: string = file.split('.')[0];
        const obj: string = await redis.get(`file:${key}`) || "";

        if (!obj) {
            fs.unlinkSync(path.join(fileDirPath, file));
            deleted++;
        } else {
            const jsonObj = JSON.parse(obj);

            if (Date.now() - jsonObj.updateAt > timeAlive) {
                fs.unlinkSync(path.join(fileDirPath, file));
                await redis.del(key);
                deleted++;
            }
        }
    }
    // console.log(`Удалено файлов: ${deleted}`);
});
