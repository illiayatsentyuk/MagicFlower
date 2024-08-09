import sqlite from "sqlite3";

let sql;

sqlite.verbose = true;

const db = new sqlite.Database("./creatures/players.db",sqlite.OPEN_READWRITE,(err)=>{
    if(err)console.error(err)
});

const insertInDB = (obj) => {
    let userData = {
        username:obj.name,
        age:obj.age,
        iq:obj.iq,
        strong:obj.strong,
        dexterity:obj.dexterity
    }
    sql = `INSERT INTO players(name,age,iq,strong,dexterity) VALUES (?,?,?,?,?)`
    db.run(sql,[userData.username,userData.age,userData.iq,userData.strong,userData.dexterity],(err)=>{
        if(err)console.error(err); else console.log("success")
    })
}

export default insertInDB;