import axios from 'axios';
import { useMemo, useState,useCallback} from 'react';
import { Some } from '.';
import './App.css'
import { SevenDays } from './Components/SevenDaysReport';
import { SunChart } from './Components/SunChart';
import { TemperatureChart } from './Components/Temp_Chart';
import debounce from "lodash/debounce";
import countryFinder from "country-finder";
import clouds from "./Icons/clouds.svg";
import sunny from "./Icons/sunny.svg";
import rain from "./Icons/rain.svg";


function App() {
  
  let code = Some()

  const types = {
    Clear:sunny,
    Clouds:clouds,
    Rain:rain
}

  const [hourly,setHourly] = useState({
    data:"",
    temp:"",
    main:"",
    pressure:"",
    humidity:"",
    sunrise: "",
    sunset: ""
  })

  const [weather,setWeather] = useState({
    seven:[],
    hours:[]
  })

  const [inputValue,setInputValue] = useState({
    city:"",
    country:"",
    type:"",
    temp:"",
    result:"",
    coord:{lat:"",lon:""}
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
  let {latitude,longitude} = position.coords

  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${code}&units=metric`)
  .then(({data})=>{
    console.log(data,"Data")
      setWeather({
          ...weather,
          seven:data.daily,
          hours:data.hourly
        })

        setInputValue({})
    })
    .catch((error)=>{
      console.log(error)
    })
}

const handleChange = (e) => {
  const { value } = e.target;
  setInputValue({...inputValue,input:value});
  handleSearch(value);
};

const handleSearch = useCallback(
    debounce((value) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${code}&units=metric`)
      .then(({data})=>{
        console.log(data)
        setInputValue({...inputValue,
          city:data.name,
          country:countryFinder.byCountryCode(data.sys.country).name,
          temp:data.main.temp,
          type:data.weather[0].main,
          result:"Found",
          coords:{latitude:data.coord.lat,longitude:data.coord.lon}
        })
      })
      .catch((error)=>{
        setInputValue({result:"Not Found"})
      })
    }, 500),
    []
  );


  return (
    <div className="App">
      <div className="search">
        <input type="search" onChange={handleChange} placeholder="Search"/>
        <button></button>
      </div>
      {inputValue.result?
        <div onClick={()=>{showPosition(inputValue)}} className="SearchResult">
          {inputValue.result == "Not Found"
          ?
          <strong>{inputValue.result}</strong>
          :
          <>
            <strong className="CityCountry">{inputValue.city},&nbsp; {inputValue.country}</strong>
            <div id="Temps">
                <div>
                  <p>{inputValue.temp|0}° C</p>
                  <p>{inputValue.type}</p>
                </div>
                <img src={types[inputValue.type]} alt={types[inputValue.type]} />
            </div>

          </>
        }
      </div>:<></>}
      <SevenDays data={weather} sendData={getHourlyOnClick}/>
      <button onClick={()=>{getLocation()}}>Click</button>
      <TemperatureChart hour={weather.hours} data={hourly}/>
      <SunChart data={hourly}/>
    </div>
  );
}

export default App;
