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

export const TemperatureChart = ({dataFor,data}) =>{

    let chartData = useMemo(()=>{

        let twentyFour = [];
        let {max,min} = dataFor.seven[0].temp;
        let count = 0;
        
       for(let elem of dataFor.hours){
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
            else
            {
                let randomTemp = Math.round(Math.random() * (max - min) + min)
                if(count <= 23 )
                {
                    twentyFour.push({...elem,temp:+randomTemp});
                }
                else
                {
                    break;
                }
                count++
            }
        }

        let returnData = []
        twentyFour.map((elem,index)=>{
            let obj = {x:elem.temp,y:index}
            returnData.push(obj)
        })

        return returnData

    },[data])


    return <div className={Style.ChartBox}>
        <div className={Style.TempBox}>
            <h1>{data.temp|0}°C <img src={data.main} alt={data.main} /></h1>
        </div>
        <div>
            <VictoryChart 
                height={440}
                width={1200}
                theme={VictoryTheme.material}>
                <VictoryArea
                interpolation="monotoneX"
                labels={({ datum }) => datum.x}
                    animate={{
                        duration: 3000,
                        onLoad: { duration: 3000 }
                    }}
                    style={{
                        data: { fill: "tomato"},
                        labels: { fontSize: 12 },
                        parent: { border: "10px ridge black"}
                      }}
                    data={chartData}/>
            </VictoryChart>
        </div>
    </div>
}