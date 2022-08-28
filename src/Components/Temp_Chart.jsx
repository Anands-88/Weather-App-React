import { getElementError } from "@testing-library/react"
import { useMemo } from "react"
import {VictoryChart,VictoryTheme,VictoryArea} from "victory"
import Style from "./temp_chart.module.css"
// import clouds from "../Icons/clouds.svg";
// import sunny from "../Icons/sunny.svg";
// import rain from "../Icons/rain.svg"

// const types = {
//     Clear:sunny,
//     Clouds:clouds,
//     Rain:rain
// }

export const TemperatureChart = ({hour,data}) =>{


    let hourlyData = useMemo(()=>{

        let twentyFour = [];

       for(let elem of hour){
            let res = new Date(elem.dt*1000).toLocaleString("en-UK", {timeZone: 'Asia/Kolkata'})
            const date = res.slice(0,10);
            const time = res.slice(12,17);
            const hours = +time.slice(0,2);

            elem = {...elem,dt:time}
            if(data.date === date)
            {
                if(hours === 23 )
                {
                    twentyFour.push(elem);
                    break;
                }
                else
                {
                    twentyFour.push(elem);
                }
            }
        }

        console.log(twentyFour,"24")

    },[data])

    const chartData = [
        { x: 1, y: 0 },
        { x: 2, y: 8 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
        ]

    return <div className={Style.ChartBox}>
        <div className={Style.TempBox}>
            <h1>{data.temp|0}°C <img src={data.main} alt={data.main} /></h1>
        </div>
        <VictoryChart 
            theme={VictoryTheme.material}>
            <VictoryArea
                animate={{
                    duration: 3000,
                    onLoad: { duration: 3000 }
                  }}
                style={{ data: { fill: "black" } }}
                data={chartData}/>
        </VictoryChart>
    </div>
}