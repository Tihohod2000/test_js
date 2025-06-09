import fs from 'fs';
import path from 'path';
import cron from 'node-cron';
import {fileDirPath, timeAlive} from './config';
import {validTtlFile} from './utils';
import {redis} from "./redis"


cron.schedule('*/1 * * * *', async () => {
    console.log('Запуск cron-задачи');


    let keys = await redis.keys("*");

    for (let key of keys) {
        const ttl = await redis.ttl(key);
        if (ttl === -2) continue; // ключа уже нет
        if (ttl === -1) console.log(`${key} бессрочный`);
        else console.log(`${key} живёт ещё ${ttl} секунд`);
    }

    // console.log(keys);

    let deleted = 0;

    const files = fs.readdirSync(fileDirPath);

    for(let file of files) {
        const key = file.split('.')[0];
        // console.log(key)

        const obj = await redis.get(`file:${key}`);

        if(obj === null) {
            fs.unlinkSync(path.join(fileDirPath, file));
            await redis.del(key);
            deleted++;
        }else{
            console.log("Объект ещё есть");
            const jsonObj = JSON.parse(obj);

            if(Date.now() - jsonObj.updateAt > timeAlive) {
                fs.unlinkSync(path.join(fileDirPath, file));
                await redis.del(key);
                deleted++;
            }

        }

    }

    // for (const key of keys) {
    //     const keyOfFile = file.split('.')[0];
    //     let ttl = await redis.ttl(key);
    //     console.log(ttl);
    //     if(ttl < 0) {
    //         fs.unlinkSync(path.join(fileDirPath, `key`));
    //         console.log(`Удалён файл: ${file}`);
    //         deleted++;
    //         await redis.del(keyOfFile);
    //
    //     }
    // }

    console.log(`Удалено файлов: ${deleted}`);
    // console.log(await redis.keys("*"));
});
