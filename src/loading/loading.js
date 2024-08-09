import logUpdate from "log-update";

const frames = ['-', '\\', '|', '/'];
let index = 0;
let i = 0

const timer = () => {
    console.clear();
    var intervalId = setInterval (()=>{

        const frame = frames[index = ++index % frames.length];
        logUpdate(`${frame} loading ${frame}`);
        i++
    },80)
    setTimeout(()=>{
        logUpdate.clear();
        clearInterval(intervalId);
    },1500)
}

export default timer;