import React, { useState } from 'react'
import WeatherBG from './Component/WeatherBG'

const App = () => {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [suggestion , setSuggestion] = useState([]);


  const API_KEY = 'b92c59f270b6b170e9cd45c8c04d56ae'
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  //https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid={API_KEY}&lang={lang}
   

  //this function check weather exists and return an object
  const getWeatherCondition = () => weather && ({
    main: weather.weather[0].main,
    isDay : Date.now() /1000 > weather.sys.sunrise &&  Date.now() /1000 < weather.sys.sunset
  })

  return (
    <div className=" min-h-screen">
      <WeatherBG condition={getWeatherCondition()} />
     
     <div className='flex items-center justify-center p-6 min-h-screen'>
      <div className='bg-transparent backdrop-filter backdrop-blur-md rounded-xl
      shadow-2xl p-8 max-w-md text-white  w-full border border-white/30 relative z-10 '> 
        <h1 className='text-4xl font-extrabold text-center mb-6'>
          Weather Application
        </h1>

        {weather ? (
          <form onSubmit={handleSearch} className='flex flex-col relative'>
            <input value={{city}} onChange={(e) => setCity(e.target.value)} placeholder='Enter City or Country (min 3 letters)'
              className='mb-4 p-3 rounded border border-sky-800 bg-transparent text-white placeholder:white
              focus:outline-none focus:border-blue-300 duration-300'
            />
            {suggestion.length > 0 && (
              <div className='absolute top-12 left-0 right-0 bg-transparent shadow-md
              rounded z-10'>
              {suggestion.map((s)=>(
                <button type='button' key={`${s.lat}-${s.lon}`}
                onClick={() => fetchWeatherData(
                  `//https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid={API_KEY}&units=metric`
                  `${s.name}, ${s.country}${s.state ? `,${s.state}` : ' '}`
                )} className='block hover:bg-blue-400 bg-transparent px-4 py-2 text-sm text-left w-full
                transition-colors'>
                {s.name},{s.country}{s.state `, ${s.state}`}
                </button>
                ))}
              </div>
            )}
            <button type='submit' className='bg-purple-700 hover:bg-amber-400 text-white font-semibold
            py-2 px-4 rounded transition-colors'> Get Weather</button>
          </form>
        ): (
          <div className='mt-6 text-center transition-opacity duration-500'>
             <button onClick={()=>{setWeather(null); setCity('')}}
             className='mb-4 bg-violet-900 hover:bg-amber-700 text-white font-semibold
             py-1 px-3 rounded transition-colors'>
             Search Here
             </button>
          </div>
        ) }

      </div>
     </div>

    </div> 
  )
}

export default App