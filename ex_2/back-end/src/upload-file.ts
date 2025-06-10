import {redis} from "./redis";
import {port} from "./config";
import {updataStatistics} from "./statistics";

export async function uploadFile(uploadFile:
                                 {
                                     uuid: string;
                                     path: string;
                                     createdAt: number;
                                     updateAt: number;
                                     countDownload: number; }) {
    const key: string = `file:${uploadFile.uuid}`;
    await redis.set(key, JSON.stringify(uploadFile));
    await updataStatistics()

    const generatedLink: string = `http://localhost:${port}/download/file:${uploadFile.path}`;
    return generatedLink;
}