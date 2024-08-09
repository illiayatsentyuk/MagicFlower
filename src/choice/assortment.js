import chalk from "chalk";
import createPlayer from "../player/createPlayer.js";
import loadPlayer from "../player/loadPlayer.js";
import deletePlayer from "../player/deletePlayer.js";
import print from "../plugins/figlet.js";
import promptSync from "prompt-sync";
import readingFromDB from "../player/showPlayers.js";
import Player from "../player/classPlayer.js";


const prompt = promptSync();

const error = chalk.bold.red;

let player,name;

const assortmentOption = async (back) => {
    console.clear();
    print();
    console.log("Variants:\n" + chalk.green("(1) - Create New Player!\n") +
        chalk.blueBright("(2) - Show list of players\n") +
        chalk.yellow("(3) - Load player\n" +
        chalk.magenta("(4) - Delete player\n")) +
        chalk.red("(99) - Back to main page\n"))
    const number = +prompt("Enter number: ")
    switch(number) {
        case 1:
            player = await createPlayer(assortmentOption,back);
            return player;
        case 2:
            await readingFromDB();
            setTimeout(()=>{
                assortmentOption(back);
                return "";
            },5000);
            break;
        case 3:
            console.clear();
            print();
            name = prompt("Enter name: ");

            player = await loadPlayer(name,assortmentOption,back);
            console.log(player)
            if(player !== undefined){
                const newPlayer = new Player(player.name,player.age,player.iq,player.strong,player.dexterity)
                return newPlayer;
            }else{
                console.log(chalk.red("Somthing happened!"));
                setTimeout(async ()=>{
                    await assortmentOption(back);
                },1500)
            }
            break;
        case 4:
            console.clear();
            print()
            name = prompt("Enter name: ");
            await deletePlayer(name,assortmentOption,back);
            break;
        case 99:
            back();
            break;
        default:
            console.log(error("Enter valid number"));
            setTimeout(()=>{
                assortmentOption(back);
            },1500)

            break;
    }
    return "";
}


export default assortmentOption;