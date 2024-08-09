import cowsay from "cowsay";

const cowSay = (message) => console.log(cowsay.say({
    text : message,
    e : "oO",
    T : "U "
}));
export default cowSay;