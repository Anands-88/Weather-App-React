import {VictoryChart,VictoryLine} from "victory"
import Style from "./temp_chart.module.css"
// import clouds from "../Icons/clouds.svg";
// import sunny from "../Icons/sunny.svg";
// import rain from "../Icons/rain.svg"

// const types = {
//     Clear:sunny,
//     Clouds:clouds,
//     Rain:rain
// }

export const TemperatureChart = ({data}) =>{

    const data = [
        { x: 1, y: 0 },
        { x: 2, y: 8 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
        ]

    return <div className={Style.ChartBox}>
        <div>
            <h1>{data.temp}° <img src={data.main} alt={data.main} /></h1>
        </div>
        <VictoryChart>
            <VictoryLine data={data}/>
        </VictoryChart>
    </div>
}