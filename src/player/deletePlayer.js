import chalk from "chalk";
import PlayerModel from "../db/playerModel.js";

const deletePlayer = async (name,assortmentOption,back) => {
    try{
        if(name==="back"){
            await assortmentOption(back)
        }else{
            await PlayerModel.destroy({
                where: {
                    name,
                },
            });
            console.log(chalk.red("User deleted successfully.!"));
            await assortmentOption(back);
        }
    }catch(err){
        console.log(chalk.red("No user found!"));
        setTimeout(async ()=>{
            await assortmentOption(back);
        },1500);
    }
}

export default deletePlayer;