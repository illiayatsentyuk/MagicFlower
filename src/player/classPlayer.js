class Player{

    constructor(name,age,iq,strong,dexterity){
        this.name=name;
        this.age=age;
        this.iq=iq;
        this.strong=strong;
        this.dexterity=dexterity;
        this.hp = 100;
        this.instructions = 0;
    }
    getInstructions(){
        return this.instructions;
    }
    getHp(){
        return this.hp;
    }
    getName(){
        return this.name;
    }
    getAge(){
        return this.age;
    }
    getIq(){
        return this.iq;
    }
    getStrong(){
        return this.strong;
    }
    getDexterity(){
        return this.dexterity;
    }
    decreaseInstructions(value){
        if((this.instructions-value) <= 0){
            this.instructions = 0;
            return "Instructions cannot be less than 0";
        }else{
            this.instructions -= value;
        }
    }
    increaseInstructions(value){
        this.instructions += value;
    }
    decreaseIq(value){
        if((this.iq-value)>0){
            this.iq-=value;
        }else{
            this.iq=1;
        }
    }
    decreaseHp(value){
        if((this.hp-value)>0){
            this.hp-=value;
        }else{
            return "You die";
        }
    }
    decreaseStrong(value){
        if((this.strong-value)>0){
            this.strong-=value;
        }else{
            this.strong = 1;
        }
    }
    decreaseDexterity(value){
        if((this.dexterity-value)>0){
            this.dexterity-=value;
        }else{
            this.dexterity = 1;
        }
    }
    increaseIq(value){
        this.iq += value
    }
    increaseStrong(value){
        this.strong+=value;
    }
    increaseDexterity(value){
        this.dexterity+=value;
    }
}

export default Player;