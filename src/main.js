import promptSync from "prompt-sync";
import chalk from "chalk";
import print from "./plugins/figlet.js";
import cowSay from "./plugins/cowsay.js";
import assortmentOption from "./choice/assortment.js";
import exit from "./choice/exit.js";
import loading from "./loading/loading.js";
import logUpdate from "log-update";
import game from "./game/game.js"

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
let player;



const prompt = promptSync();
console.clear();


let choose;
const choice = () =>{
    console.clear()
    print();
    setTimeout(async ()=>{
        console.log("Variants:\n" +
            chalk.green("(1) - Play\n") +
            chalk.red("(2) - Exit\n") +
            chalk.blueBright("(3) - Cowsay"))
        choose = +prompt("Enter number: ");
        switch(choose) {
            case 1:
                console.clear();
                print();
                const player = await assortmentOption(choice);
                if(player !== ""){
                    console.log(game(player));
                }else{
                    console.log(player);
                }
                break;
            case 2:
                exit(choice)
                break;
            case 3:
                const message = prompt("Enter message: ");
                if(message === "back"){
                    choice();
                }else{
                    console.clear();
                    cowSay(message);
                    setTimeout(()=>{
                        choice();
                    },1500)
                }

                break;
            default:
                console.log(error("Enter valid number"));
                setTimeout(()=>{
                    choice();
                },1500)

                break;
        }
    },500)

}
choice();
