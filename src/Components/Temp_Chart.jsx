import {VictoryChart,VictoryLine} from "victory"
import Style from "./temp_chart.module.css"

export const TemperatureChart = () =>{

    const data = [
        { x: 1, y: 0 },
        { x: 2, y: 8 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
        ]

    return <div className={Style.ChartBox}>
        <VictoryChart>
            <VictoryLine data={data}/>
        </VictoryChart>
    </div>
}