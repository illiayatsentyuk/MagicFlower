import PlayerModel from "../db/playerModel.js";

const loadPlayer = async (name,assortmentOption,back) => {
    if(name==="back"){
        await assortmentOption(back);
    }else{
        try{
            const user = await PlayerModel.findOne({
                where: {
                    name: name,
                }
            })
            return user.dataValues;
        }catch (err){
            await assortmentOption(back);
        }

    }

}


export default loadPlayer;