
import axios from "axios"
import Style from "./sevenDays.module.css";
import clouds from "../Icons/clouds.svg";
import sunny from "../Icons/sunny.svg";
import rain from "../Icons/rain.svg"

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

export const SevenDays = ({data}) =>{

    const types = {
        Clear:sunny,
        Clouds:clouds,
        Rain:rain
    }

    console.log(data)
    let type; // For getting the Icons according to weather Type

    return <div id={Style.reportBox}>
        {data.seven.map((elem,index)=>{
            {type = types[elem.weather[0].main]} 
           return <div key={index} className={Style.content}>
                    <h4>{Time(elem.dt)}</h4>
                    <h4>{elem.temp.max|0}°&nbsp; {elem.temp.min|0}°</h4>
                    <img src={type} alt={type} />
                    <h4>{elem.weather[0].main}</h4>
                </div>
        })}
        
    </div>
}

function Time(time)
  {
   const data = new Date(time*1000)
   const index =  data.getDay()
   return days[index]
  }