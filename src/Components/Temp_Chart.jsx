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

    const chartData = [
        { x: 1, y: 0 },
        { x: 2, y: 8 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
        ]

        console.log(hour,"CHARTSDATA")

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