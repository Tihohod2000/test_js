import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 8000;
export const timealive: number = Number(process.env.TIME_ALIVE) || 15;