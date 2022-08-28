
import Style from "./sevenDays.module.css";
import clouds from "../Icons/clouds.svg";
import sunny from "../Icons/sunny.svg";
import rain from "../Icons/rain.svg"
import { useState, useEffect } from "react";

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

export const SevenDays = ({data,sendData}) =>{

    const [click,setClick] = useState()

    const types = {
        Clear:sunny,
        Clouds:clouds,
        Rain:rain
    }

   useEffect(()=>{

    let elem = data?.seven[0]
    let res = new Date(elem?.dt*1000).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'})
        sendData({
            date:res.slice(0,10)||"",
            temp:elem?.temp.day||"",
            main:types[elem?.weather[0].main]||"",
            pressure:elem?.pressure||"",
            humidity:elem?.humidity||"",
            sunrise: Time(elem?.sunrise,"sun")||"",// get Accurate Time
            sunset: Time(elem?.sunset,"sun")||"" // get accurate time
        })
    },[data])

    let type; // For getting the Icons according to weather Type

    return <div id={Style.reportBox}>
        {data.seven.map((elem,index)=>{
            type = types[elem.weather[0].main]
            
           return <div key={index} className={Style.content} 
           style={{border:index === click?"5px solid red":"none"}}
           onClick={()=>{
                let res = new Date(elem?.dt*1000).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'})
            sendData({
                date:res.slice(0,10), // get Date
                temp:elem.temp.day,
                main:type,
                pressure:elem.pressure,
                humidity:elem.humidity,
                sunrise: Time(elem.sunrise,"sun"),// get Accurate Time
                sunset: Time(elem.sunset,"sun") // get accurate time
            })
            setClick(index)}} >
                    <h4>{Time(elem.dt,"day")}</h4>
                    <h4>{elem.temp.max|0}° &nbsp; {elem.temp.min|0}°</h4>
                    <img src={type} alt={type} />
                    <h4>{elem.weather[0].main}</h4>
                </div>
        })}
        
    </div>
}

function Time(time,type)
  {
   const data = new Date(time*1000)
   if(type==="day")
   {
    const index =  data.getDay()
    return days[index]
   }
   else if(type==="sun")
   {
    let result = data.toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'})
    return result.slice(12,17)
   }
   
   
  }