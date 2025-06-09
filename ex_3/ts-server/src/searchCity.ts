import {redis} from "./redis";

export async function searchCity(cityName: string) {
    try{
        console.log(cityName);
        let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);

        if(!res.ok){
            const errorData = await res.json().catch(() => null);
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorData?.message || 'Unknown error'}`);
        }

        const data = await res.json();
        console.log(data);

        const lat: number = data.latitude;
        const lon: number = data.longitude;

        res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`)

        redis.set(cityName, )



        return data;

    }catch (error){
        console.log(error);
        throw error;
    }
}