import Redis from 'ioredis';

export const redis = new Redis({password: "secret", host: "redis", port:6379}); // по умолчанию подключается к localhost:6379

