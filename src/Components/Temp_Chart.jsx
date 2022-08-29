import { getElementError } from "@testing-library/react"
import { useMemo, useState } from "react"
import {VictoryChart,
        VictoryAxis,
        VictoryLine,VictoryBrushContainer,
        VictoryZoomContainer} from "victory"
import Style from "./temp_chart.module.css"

export const TemperatureChart = ({dataFor,data}) =>{

    let {max,min} = dataFor?.seven[0]?.temp||0;

    const [zoomDom,setZoomDom] = useState({
        zoomDomain: { x: [min|0, max|0] }
    })
  
    function handleZoom(domain) {
        setZoomDom({ zoomDomain: domain });
    }

    let chartData = useMemo(()=>{

        let twentyFour = [];
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
                    twentyFour.push({...elem,temp:+randomTemp|0});
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
            let obj = {y:elem.temp|0,x:index}
            returnData.push(obj)
        })
        console.log(returnData,"rETURNdATA")
        return returnData

    },[data])


    return <div className={Style.ChartBox}>
        <div className={Style.TempBox}>
            <h1>{data.temp|0}°C <img src={data.main} alt={data.main} /></h1>
        </div>
        <div id={Style.Chart}>
            <VictoryChart width={660} height={280} 
                    containerComponent={
                        <VictoryZoomContainer
                        zoomDimension="x"
                        zoomDomain={zoomDom.zoomDomain}
                        onZoomDomainChange={handleZoom}/>
                    }
                    >
                <VictoryLine
                    style={{
                        data: { stroke: "tomato" }
                    }}
                    data={chartData}
                    />

                </VictoryChart>
                {/* <VictoryChart
                    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                    width={600} height={100} scale={{ x: "time" }}
                    containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={this.state.zoomDomain}
                        onBrushDomainChange={this.handleZoom.bind(this)}/> }>
                    <VictoryAxis
                    tickFormat={(x) => new Date(x).getFullYear()}
                    />
                    <VictoryLine
                    style={{
                        data: { stroke: "tomato" }
                    }}
                    data={[
                        { key: new Date(1982, 1, 1), b: 125 },
                        { key: new Date(1987, 1, 1), b: 257 },
                        { key: new Date(1993, 1, 1), b: 345 },
                        { key: new Date(1997, 1, 1), b: 515 },
                        { key: new Date(2001, 1, 1), b: 132 },
                        { key: new Date(2005, 1, 1), b: 305 },
                        { key: new Date(2011, 1, 1), b: 270 },
                        { key: new Date(2015, 1, 1), b: 470 }
                    ]}
                    x="key"
                    y="b"
                    />
        </VictoryChart> */}
      </div>
                

        </div>
}

/* <VictoryChart 
                    height={420}
                   width={1000}>
                   
                <VictoryArea
                        style={{
                        data: {
                            fill: "#c43a31", fillOpacity: 0.7, stroke: "#c43a31", strokeWidth: 0
                        },
                        labels: {
                            fontSize: 10,
                            fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                        }
                        }}
                        data={chartData}
                        labels={({ datum }) => datum.y}
                    />
                </VictoryChart>

*/ 