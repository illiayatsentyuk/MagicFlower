import chalk from "chalk";
import promptSync from "prompt-sync";
import Player from "./classPlayer.js";
import fs from "fs";
import sqlite from "sqlite3";
import PlayerModel from "../db/playerModel.js"
const prompt = promptSync();


let sql;

sqlite.verbose = true;


let name,age,iq,strong,dexterity;

const enterValidData = (message,assortment,back) => {
    console.log(chalk.red(message));
    setTimeout(()=>{
        console.clear();
        createPlayer(assortment,back);
    },1500)
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
const createPlayer = async (assortment,back) => {
    console.clear();
    let points = getRandomArbitrary(3,12);
    let newPoints = points;
    console.log(`You have ${points} points!`);
    name = prompt("Enter name: ");
    if(name === "back"){
        assortment(back);
        return "";
    }else if(name === "" || name.trim() === ''){
        enterValidData("Enter valid name!",assortment,back);
        return "";
    }
    try{
        age = prompt("Enter age: ");
        if(age === "back"){
            assortment(back);
            return "";
        }else if(+age <= 0){
            enterValidData("Age can`t be less than 0",assortment,back);
            return "";
        }
        iq = prompt("Enter iq: ");
        if(iq === "back"){
            assortment(back);
            return "";
        }else if(+iq > newPoints){
            enterValidData("Enter valid data!",assortment,back);
            return "";
        }else if(+iq <= 0 || +iq === newPoints){
            enterValidData("Enter valid data!",assortment,back);
            return "";
        }
        newPoints-= +iq;
        console.log(`Now you have ${newPoints} points!`);
        strong = prompt("Enter strong: ");
        if(strong === "back"){
            assortment(back);
            return "";
        }else {
            if(newPoints < +strong){
                console.log("Enter valid number")
                strong = 0;
                strong = prompt("Enter strong: ");
                if(newPoints < +strong){
                    enterValidData("Enter valid data!",assortment,back);
                    return "";
                }
            }else{
                newPoints -= +strong;
                console.log(`Now you have ${newPoints} points!`);
            }
        }

        dexterity = prompt("Enter your dexterity: ");
        if(dexterity === "back"){
            assortment(back);
            return "";
        }else if(isNaN(+age) || isNaN(+iq) || isNaN(+strong) || isNaN(dexterity)) {
            enterValidData("Enter valid data!",assortment,back);
            return "";
        }else {
            if(newPoints < +dexterity){
                console.log("Enter valid number")
                strong = 0;
                strong = prompt("Enter dexterity: ");
                if(newPoints < +dexterity){
                    enterValidData("Enter valid data!",assortment,back);
                    return "";
                }
            }else{
                console.log(chalk.green("You create player!"));
                name = name.trim();
                const player = new Player(name,+age,+iq,+strong,+dexterity);
                let hp = player.getHp();
                console.log("Player: ", player)
                const model = await PlayerModel.create({
                    name:player.name,
                    age:player.age,
                    iq:player.iq,
                    strong:player.strong,
                    dexterity:player.dexterity,
                    hp,
                });
                return model.dataValues;
            }
        }

    }catch (e) {
        console.log(chalk.red(e))
        setTimeout(()=>{
            createPlayer(assortment,back);
        },1500)

    }
}

export default createPlayer;

