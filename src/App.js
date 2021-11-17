import React, {useState} from "react";
import './App.css';


const api = {
  key: "6088408d752b741b61bcc4c1fb084068",
  base: "https://api.openweathermap.org/data/2.5/"
}

let date = new Date().toString()
console.log(date)
console.log(typeof(date))
//.toString()
// let date = String(new window.Date())
 date = date.slice(0,15)
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = event => {
    if(event.key === "Enter"){
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
         setWeather(result);
         setQuery("");
       } );
    }
  }

  return (
    <div className={
                     (typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? "appwarm" : "app")
                     : "app" }>
         <main>
         <div className='search-box'>
             <input
             className='search-bar'
               type='text'
               placeholder="Search..."
               onChange={(e) => setQuery(e.target.value)}
               value={query}
               onKeyPress={search}
             />
         </div>
         {(typeof weather.main != "undefined") ? (
           <div>

             <div className='location-box'>
                    <div className='location'>{weather.name}, {weather.sys.country}</div>
                    <div className='date'>{date}</div>
             </div>

             <div className='weather-box'>
                  <div className='temp'>
                      {Math.round(weather.main.temp)}c
                  </div>
                  <div className='weather'>
                       {weather.weather[0].main}
                  </div>
             </div>
           </div>
         ) : 
         ("")}
         </main>
    </div>
  );
}

export default App;
