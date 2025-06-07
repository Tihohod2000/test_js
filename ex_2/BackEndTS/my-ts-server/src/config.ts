import dotenv from 'dotenv';
dotenv.config();

export const fileDirPath = `${process.cwd()}/uploads`;
export const timeAlive = Number(process.env.TIME_ALIVE || 30) * 60 * 1000;
export const port = process.env.PORT || 8000;
