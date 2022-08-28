
import Style from "./sunchart.module.css"

export const SunChart = ({data}) =>{
    

    return <div id={Style.sunchartBox}>
        <div className={Style.PressureHumidity}>
            <div id={Style.pressure}>
                <h4>Pressure</h4>
                <p>{data.pressure} hpa</p>
            </div>
            <div id={Style.humidity}>
                <h4>Humidity</h4>
                <p>{data.humidity}%</p>
            </div>
        </div>
        <div id={Style.sunText}>
            <span style={{textAlign:"left"}}>
                <h4>Sunrise</h4>
                <kbd>{data.sunrise}</kbd>
            </span>
            <span style={{textAlign:"right"}}>
                <h4>Sunset</h4>
                <kbd>{data.sunset}</kbd>
            </span>
        </div>
    </div>
}