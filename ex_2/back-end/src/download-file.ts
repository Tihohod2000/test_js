import {redis} from "./redis";
import path from "path";
import {fileDirPath} from "./config";

export async function downloadFile(filename: string, keyOfFile: string) {
    const obj: string = (await redis.get(keyOfFile)) || "";


    if (obj) {
        const jsonObj = JSON.parse(obj);
        jsonObj.updateAt = Date.now();
        jsonObj.countDownload++;
        await redis.set(keyOfFile, JSON.stringify(jsonObj));
        const originalName = jsonObj.oroginalName;
        return [path.join(fileDirPath, filename), originalName];
    }

    return path.join(fileDirPath, filename);
}