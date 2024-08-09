import print from "../../plugins/figlet.js";
import {executeAllTasksRandomly} from "./actionsForFirstPart.js";
import promptSync from "prompt-sync";
const prompt = promptSync();

console.clear()
const startOfTheGame = (player) => {
    print();
    setTimeout(()=>{
        console.log("#------------------------------------------------------------------------------------------#\n" +
            "У далекому лісі існує магічнй світ, де живуть різноманітні казкові створіння.\n" +
            "Одного дня, голований герой(Ви) виявляєте, що зникла магічна квітка, яка підтримує\n" +
            "баланс в усьому лісі. Без неї все навколо починає в'янути, і ліс втрачає свою\n" +
            "чарівність. Ви повинні пройти через різні випробування, аби знайти квітку\n" +
            "та повернути її на місце, відновивши магію лісу\n" +
            "#------------------------------------------------------------------------------------------#");
            prompt("Press enter: ");
            executeAllTasksRandomly(player)
            return player;
    },500)
}

export default startOfTheGame;