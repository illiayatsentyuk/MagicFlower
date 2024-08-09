import chalk from "chalk";
import promptSync from "prompt-sync";

const prompt = promptSync();

const error = chalk.bold.red;
const exit = (choice) => {
    let yn = prompt("Are you sure?(y/n): ");
    switch(yn) {
        case "y":
            break;
        case "n":
            console.clear();
            choice();
            break;
        default:
            console.log(error("Enter valid value!"));
            setTimeout(()=>{
                exit(choice);
            },1500)

            break;
    }

}
export default exit;