import PlayerModel from "../db/playerModel.js";

const readDataFromDb = async (name) => {
    console.clear();
    const user = await PlayerModel.findAll();
    user.forEach((user)=>{
        console.log(user.dataValues)
    })
    return "";
}
export default readDataFromDb;