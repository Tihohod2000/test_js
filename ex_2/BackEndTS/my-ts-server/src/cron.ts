import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import {fileDirPath, timeAlive} from './config';
import {validTtlFile} from './utils';
import {redis} from "./redis"


cron.schedule('*/1 * * * *', async () => {
    console.log('Запуск cron-задачи');

    await redis.set('JS', JSON.stringify({name : "jhsdfa"}));
    await redis.set('key12', "sdfsd");
    await redis.set('key13', "sdfsd");
    await redis.set('key14', "sdfsd");

    let redisInf = await redis.keys("*");

    console.log(redisInf);

    let keyJson = await redis.get('JS') || ""

    console.log(JSON.parse(keyJson));

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
