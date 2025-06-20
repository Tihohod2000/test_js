import {redis} from "./redis";
import {timealive} from "./config";

export async function searchCity(cityName: string) {

    const cityObject = await redis.get(`cityName:${cityName}`);
    if (cityObject) {
        await redis.expire(`cityName:${cityName}`, timealive * 60);
        return JSON.parse(cityObject);
    }

    try {
        let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(`HTTP error! status: ${res.status},` +
                `message: ${errorData?.message || 'Unknown error'}`);
        }

        const data = await res.json();
        const lat = data.results[0].latitude;
        const lon = data.results[0].longitude;
        const metioData = await gettingMetio(lat, lon);

        const City = {
            cityName: cityName,
            metioData: metioData
        }

        await redis.set(`cityName:${cityName}`, JSON.stringify(City), "EX", timealive * 60);
        return City;

    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function gettingMetio(lat: number, lon: number) {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?`
        + `latitude=${lat}&longitude=${lon}&hourly=temperature_2m`)
    const data = await res.json().catch(() => null);

    //оставляем часы текущего дня и соответствующие температуры
    const time: Array<string> = (data.hourly.time).slice(0, 24);
    const temperature: Array<number> = (data.hourly.temperature_2m).slice(0, 24);
    return {
        time: time,
        temperature: temperature,
    };

}