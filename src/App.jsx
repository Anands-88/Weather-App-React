import axios from 'axios';
import { useMemo, useState } from 'react';
import { Some } from '.';
import './App.css'
import { SevenDays } from './Components/SevenDaysReport';
import { SunChart } from './Components/SunChart';
import { TemperatureChart } from './Components/Temp_Chart';


function App() {
  
  const [hourly,setHourly] = useState({
    temp:"",
    main:"",
    pressure:"",
    humidity:"",
    sunrise: "",
    sunset: ""
  })

  const [weather,setWeather] = useState({
    current:[],
    seven:[],
    hours:[]
  })

  const getHourlyOnClick = (value)=>{
      setHourly(value)
  }

  // const calIt = useMemo(()=>{
  //   getLocation()
  // },[])

  // get visitor's location
function getLocation() {
  console.log("Hello")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function handleError(error) {
  let errorStr;
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorStr = 'User denied the request for Geolocation.';
      break;
    case error.POSITION_UNAVAILABLE:
      errorStr = 'Location information is unavailable.';
      break;
    case error.TIMEOUT:
      errorStr = 'The request to get user location timed out.';
      break;
    case error.UNKNOWN_ERROR:
      errorStr = 'An unknown error occurred.';
      break;
    default:
      errorStr = 'An unknown error occurred.';
  }
  alert('Error occurred: ' + errorStr);
}

function showPosition(position) {
  let data = Some()
  let {latitude,longitude} = position.coords

  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${data}&units=metric`)
    .then(({data})=>{
      setWeather({
          ...weather,
          current:data.current,
          seven:data.daily,
          hours:data.hourly
        })
    })
    .catch((error)=>{
      console.log(error)
    })
}

  return (
    <div className="App">
      <div className="search">
        <input type="search" placeholder="Search"/>
        <button></button>
      </div>
      <SevenDays data={weather} sendData={getHourlyOnClick}/>
      <button onClick={()=>{getLocation()}}>Click</button>
      <TemperatureChart hour={weather.hours} data={hourly}/>
      <SunChart data={hourly}/>
    </div>
  );
}

export default App;
