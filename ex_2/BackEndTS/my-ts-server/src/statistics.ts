import {redis} from "./redis";

export async function updataStatistics(){
    // const dayNow: string = String(new Date().getDate());
    const now = new Date();
    const day: string = now.getDate().toString();
    const month: string = (now.getMonth() + 1).toString();
    const year: string = now.getFullYear().toString();
    const formattedDate: string = `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;

    const count: string = await redis.get(`stat:${formattedDate}`) || "";
    if(count){
        await redis.set(`stat:${formattedDate}`, Number(count) + 1);
    }else{
        await redis.set(formattedDate, 1, "EX", 60*60*24*30);
    }
}

export async function getStatistics(){
    const keys = await redis.keys("stat:*");
    let downlodingTime: string[] = [];
    let downlodingCount: number[] = [];
    for(const key of keys){
        downlodingTime.push(key.split(":")[1]);
        downlodingCount.push(Number(await redis.get(key)));
    }

    return {
        time: downlodingTime,
        count: downlodingCount,
    };
}