// import { DataTypes } from 'sequelize';
// import sequelize from "./dbConnect.js";
//
// const PlayerModel = sequelize.define('Player', {
//     name: { type: DataTypes.STRING, allowNull: false },
//     age: { type: DataTypes.NUMBER, allowNull: false },
//     iq: { type: DataTypes.NUMBER, allowNull: false },
//     strong: { type: DataTypes.NUMBER, allowNull: false },
//     dexterity: { type: DataTypes.NUMBER, allowNull: false },
// });
//
// export default PlayerModel;
//

import pkg from 'sequelize';
import chalk from "chalk";
const { Sequelize, Model, DataTypes } = pkg;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'C:/Users/ADMIN/Desktop/LNTN/MagicFlower/creatures/players.sqlite'
});

class PlayerModel extends Model {}
PlayerModel.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.NUMBER, allowNull: false },
        iq: { type: DataTypes.NUMBER, allowNull: false },
        strong: { type: DataTypes.NUMBER, allowNull: false },
        dexterity: { type: DataTypes.NUMBER, allowNull: false },
        hp:{ type: DataTypes.NUMBER, allowNull: false },
    },
    { sequelize, modelName: 'player' ,timestamps:false},
);

export default PlayerModel;

(async () => {
    await sequelize.sync();
    //await sequelize.drop();
// const illya = await PlayerModel.create({
//     name: 'Illya',
//     age: 15,
//     iq: 3,
//     strong: 4,
//     dexterity: 5,
// });
// console.log(illya.dataValues); // Getting data by this way or by this:  console.log(JSON.stringify(illya));
    // const players = await PlayerModel.findAll();
    // console.log(chalk.green('Players found.'));
    // console.log(JSON.stringify(players, null, 2));
})();
