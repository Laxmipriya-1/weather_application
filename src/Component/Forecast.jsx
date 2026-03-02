// import React, { useEffect, useState } from "react";

// const Forecast5Days = () => {
//   const [forecast, setForecast] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API_KEY = 'b92c59f270b6b170e9cd45c8c04d56ae'; // <-- Replace with your API key
//   const LAT = "23.0225"; // example latitude
//   const LON = "72.5714"; // example longitude

//   useEffect(() => {
//     const fetchForecast = async () => {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
//         );
//         const data = await response.json();

//         // Filter one forecast per day (every 8th item = 24 hours)
//         const dailyData = data.list.filter((item, index) => index % 8 === 0);

//         setForecast(dailyData.slice(0, 5));
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching forecast:", error);
//         setLoading(false);
//       }
//     };

//     fetchForecast();
//   }, []);

//   if (loading) return <p>Loading forecast...</p>;

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1 className="font-semibold">5-Day Weather Forecast</h1>
//       <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//         {forecast.map((day, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: "15px",
//               borderRadius: "10px",
//               width: "150px",
//             }}
//           >
//             <h4>
//               {new Date(day.dt_txt).toLocaleDateString()}
//             </h4>
//             <p><strong>{day.main.temp}°C</strong></p>
//             <p>{day.weather[0].description}</p>
//             <img
//               src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//               alt="weather icon"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Forecast5Days;


import React, { useEffect, useState } from "react";
import { convertTemperature } from "./Helper";

const Forecast = ({ lat, lon, unit }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = "b92c59f270b6b170e9cd45c8c04d56ae";

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch forecast");
        }

        // API returns data every 3 hours (8 entries per day)
        // So take every 8th item for 5 days
        const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

        setForecast(dailyData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!forecast.length) return null;

  return (
    <div className="mt-10 px-6 pb-10">
      <h2 className="text-center text-2xl font-bold text-white mb-6">
        5 Day Forecast
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          });

          return (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md text-white p-4 rounded-lg w-36 text-center shadow-lg"
            >
              <p className="font-semibold">{date}</p>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="mx-auto"
              />

              <p className="text-sm capitalize">
                {day.weather[0].description}
              </p>

              <p className="mt-2 font-bold">
                {convertTemperature(day.main.temp, unit)}°{unit}
              </p>

              <p className="text-xs">
                H: {convertTemperature(day.main.temp_max, unit)}° 
                L: {convertTemperature(day.main.temp_min, unit)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;




