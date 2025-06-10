import dotenv from 'dotenv';

dotenv.config();

export const fileDirPath = `./uploads`;
export const timeAlive: number = Number(process.env.TIME_ALIVE || 30) * 60 * 1000;
export const port = process.env.PORT || 3000;
