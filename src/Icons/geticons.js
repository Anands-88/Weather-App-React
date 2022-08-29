import clouds from "./clouds.png";
import sunny from "./sunny.png";
import rain from "./rain.png";
import haze from "./haze.png";


export const GetIcons = ()=>{

    const icons = {
        Clear:sunny,
        Clouds:clouds,
        Rain:rain,
        Haze:haze
    }

    return icons

}