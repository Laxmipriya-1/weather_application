import React from 'react';

import Thunderstorm_1 from "../assets/Thunderstorm_1.jpg"
import Rain_1 from "../assets/Rain_1.jpg"
import Rain_2 from "../assets/Rain_2.jpg"
import SnowDay_1 from "../assets/SnowDay_1.jpg"
import ClearDay_1 from "../assets/ClearDay_1.jpg"
import ClearNight_1 from "../assets/ClearNight_1.jpg"
import CloudsNight_1 from "../assets/CloudsNight_1.jpg"
import CloudsDay_1 from "../assets/CloudsDay_1.jpg"
import Haze_1 from "../assets/Haze_1.jpg"
import bg_video_1 from "../assets/bg_video_1.mp4"


const WeatherBG = ({ condition }) => {
    const gifs = {
        Thunderstorm_1,
        Drizzle: Rain_1,
        Rain_2,
        Snow: SnowDay_1,
        Clear: { day: ClearDay_1, night: ClearNight_1 },
        Clouds: { day: CloudsDay_1, night: CloudsNight_1 },
        Mist: Haze_1,
        Smoke: Haze_1,
        Haze_1,
        Fog: Haze_1,
        default: bg_video_1
    };

    const getBackground = () =>{
        if(!condition) return gifs.default;
        const weatherType =condition.main;
        const asset = gifs[weatherType];

        if(!asset) return gifs.default;
        if(typeof asset === 'object')
            return condition.isDay ? asset.day : asset.night;
        return asset;
    }

    const background = getBackground();

    return(
        <div className="fixed inset-0 z-0 overflow-hidden">
            {background === bg_video_1 ? (
                <video autoPlay loop muted  className='w-full h-full object-cover opacity-100
                pointer-events-none animate-fade-in'>
                    <source src={bg_video_1} type='video/mp4' />
                </video>
            ) : (
             <img src={background} alt='Weather-bg' className='
             w-full h-full object-cover opacity-20
             pointer-events-none animate-fade-in'/>
            )}

            <div className='absolute inset-0 bg-black/30'/>
        </div>
    )
}

export default WeatherBG