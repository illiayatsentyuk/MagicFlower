import print from "../../plugins/figlet.js";
import promptSync from "prompt-sync";
import Player from "../../player/classPlayer.js";
import chalk from "chalk";
const prompt = promptSync();

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

let actionsForFindingTraces = [ 
    {
      name: "Розмова з Мудрим Деревом",
      place: "Древній дуб в центрі лісу.",
      description:
        "Ви звертаєтеся до найстарішого дерева в лісі, яке може спілкуватися з іншими істотами лісу.\n" +
        "Дуб розповідає ваи, що магічна квітка була викрадена вночі, коли темрява почала оповивати ліс. Він також вказує на напрямок, \n" +
        "куди могли піти викрадачі, але попереджає, що шлях буде небезпечним і повним випробувань.",
      result: "Ви отримуєте підказку і напрямок для подальших пошуків.",
      task: false,
      instructions: 1,
      showInformation(player) {
        console.clear();
        
        print();
        setTimeout(()=>{
          console.log("#-----------------------------------------------------------#");
          console.log(`Місце - ${this.place}`);
          console.log(this.description);
          prompt("Press enter: ");
          player.increaseInstructions(this.instructions);
          return player;
        },500)
        
      },
    },
    {
      name: "Зустріч з Лісовими Феями",
      place: "Галявина біля річки, де живуть феї.",
      description:
        "Ви зустрічає групу фей, які граються біля річки. Вони спочатку не довіряють вам,\n" +
        "але скажуть якщо ви допоможете їм вирішити проблему з засміченою річкою\n",
      variantsOfChoice:
        "Variant: \n" +
        "(1) - Піти прибрати камені\n" +
        "(2) - Відмовитися і піти далі\n",
      textOfTask:
        "Феї кажуть, що вище за течією є камні,уламки темних зірок, які і забрднюють річку.\n" +
        "Вони просять вас піти і прибрати їх.Вони сказали що винагородять вас!",
      descriptionAfterTask:
        "Вони кажуть що бачили темні тіні, що рухались \n" +
        "у напрямку до Забороненого Лісу. Феї дають вам чарівний амулет, який може збільшити вашу спритність.(+2)",
      result:
        "Герой отримує нову інформацію про напрямок руху викрадачів і захисний амулет.",
      task: true,
      instructions: 1,
      variantsOfChoiceFunction(variant, player) {
        let number = +variant;
        switch (number) {
          case 1:
            const strong = player.getStrong();
            if (strong <= 2) {
              console.log(
                "Феї доручили вам очистити річку, але ви занадто слабкі для цього"
              );
              player.decreaseInstructions(this.instructions);
              return player;
            } else {
              console.log("Ви допомогли очистити річку.\n");
              console.log(this.descriptionAfterTask);
              player.increaseInstructions(this.instructions);
              player.increaseDexterity(2);
              return player;
            }
  
          case 2:
            console.log("Ви пройшли далі!");
            return player;
          default:
            console.log(chalk.red("Please enter valid number!"));
            setTimeout(() => {
              this.taskForPlayer(player);
            }, 1500);
            break;
        }
      },
      taskForPlayer(player) {
        console.clear();
        print();
        setTimeout(() => {
          console.log(
            "#-----------------------------------------------------------#"
          );
          console.log(`Місце - ${this.place}`);
          console.log(this.description);
          console.log(this.textOfTask);
          console.log(this.variantsOfChoice);
          let variant = prompt("Enter number: ");
          console.clear();
          player = this.variantsOfChoiceFunction(variant, player);
          return player;
        }, 500);
      },
    },
    {
      name: "Відвідування Селища Лісових Духів",
      place: "Приховане селище, де живуть лісові духи.",
      description:
        "Ви відвідуєте селище лісових духів, які спочатку відмовляються спілкуватися з ним через страх перед темрявою, що настає.",
      variantsOfChoice:
        "Variant: \n" +
        "(1) - Допомогти відновити магічний бар'єр\n" +
        "(2) - Піти далі\n",
      textOfTask:
        "Духи кажуть, що треба відновити магічний бар'єр і питають у вас, чи зможете ви їм у цьому допомогти",
      descriptionAfterTask:
        "Після того, як герой доводить свою добру волю, допомагаючи їм відновити магічний бар'єр навколо селища, \n" +
        "духи розповідають, що бачили, як загадкові істоти переносили квітку через міст, який веде до древнього храму, де живе могутній чаклун.",
      result:
        "Ви отримуєте підтвердження про те, куди ведуть сліди викрадачів, і дізнається про можливу причетність чаклуна.",
      task: true,
      instructions: 1,
      variantsOfChoiceFunction(variant, player) {
        let number = +variant;
        switch (number) {
          case 1:
            const iq = player.getIq();
            if (iq <= 2) {
              console.log(
                "Магічні духи доручили вам відновити магічний бар'єр, але ви занадто дурнуваті для цього\n" +
                  "Ви налажали і зробили тільки гірше. Вас прокляли духи і вигнали з селища(У вас розум знижається на -1)"
              );
              player.decreaseIq(1);
              return player;
            } else {
              console.log(
                "Ви допомогли духам відновити магічний бар'єр.\n" +
                  "Вони вас за це благословили(+1 до розому)"
              );
              player.increaseInstructions(this.instructions);
              player.increaseIq(1);
              return player;
            }
  
          case 2:
            console.log("Ви пройшли далі!");
            return player;
          default:
            console.log(chalk.red("Please enter valid number!"));
            setTimeout(() => {
              this.taskForPlayer(player);
            }, 1500);
            break;
        }
      },
      taskForPlayer(player) {
        print();
        setTimeout(() => {
          console.log(
            "#-----------------------------------------------------------#"
          );
          console.log(`Місце - ${this.place}`);
          console.log(this.description);
          console.log(this.textOfTask);
          console.log(this.variantsOfChoice);
          let variant = prompt("Enter number: ");
          
          console.clear();
          player = this.variantsOfChoiceFunction(variant, player);
          return player;
        }, 500);
      },
    },
    {
      name: "Бесіда з Вартовим Каменем",
      place: "Древній кам'яний моноліт на узліссі.",
      description:
        "Герой знаходить стародавній кам'яний моноліт, який колись був вартовим порталом між світами. Герой звертається до каменя з проханням про допомогу. \n" +
        "Камінь відкриває йому видіння, в якому показано, що квітка була викрадена істотами, які з'явилися з темного порталу в Забороненому Лісі. \n" +
        "Він також бачить обличчя головного викрадача – тіньового мага, який планує використати квітку для своєї темної магії.",
      result:
        "Ви отримуєте підтвердження про те, куди ведуть сліди викрадачів, і дізнається про можливу причетність чаклуна.",
      task: false,
      instructions: 1,
      showInformation(player) {
        console.clear();
        print();
        setTimeout(() => {
          console.log(
            "#-----------------------------------------------------------#"
          );
          console.log(`Місце - ${this.place}`);
          console.log(this.description);
          let variant = prompt("Press enter: ");
          player.increaseInstructions(this.instructions);
          return player
        }, 500);
      },
    },
    {
      name: "Зустріч з Водяними Духами",
      place: "Глибокий ставок на околиці лісу.",
      description:
        "Герой доходить до старого ставка, де мешкають водяні духи. Вони неохоче з вами спілкуються.",
      variantsOfChoice:
        "Variant: \n" +
        "(1) - Допомогти почистити ставок\n" +
        "(2) - Піти далі\n",
      textOfTask:
        "Водяні духи просять вас очистити ставок від негативної енергії",
      descriptionAfterTask:
        "Водяні духи дарують вам чарівну книжку, яка містить давні знання про магічні створіння і закляття.\n" +
        "В книжці є згадка про те, як перемогти Тіньових Воїнів.\n" +
        "Також в книжці було якесь дивне заклинання \n" +
        "'Сила води в моїх жилах, даруй мені міць, швидкість і розум!'",
      result:
        "Герой отримує книжку з корисними знаннями і дізнається більше про своїх ворогів.",
      task: true,
      instructions: 1,
      variantsOfChoiceFunction(variant, player) {
        let number = +variant;
        switch (number) {
          case 1:
            const iq = player.getIq();
  
            if (iq <= 2) {
              console.log(
                "Водяні духи доручили вам очистити озеро, але ви не справилися(ви занадто дурні)Ви пішли від них\n"
              );
              return player;
            } else {
              console.log(
                "Ви допомогли духам почистити озеро.\n" +
                  this.descriptionAfterTask
              );
              player.increaseInstructions(this.instructions);
              return player;
            }
  
          case 2:
            console.log("Ви пройшли далі!");
            break;
          default:
            console.log(chalk.red("Please enter valid number!"));
            setTimeout(() => {
              this.taskForPlayer(player);
            }, 1500);
            break;
        }
      },
      taskForPlayer(player) {
        console.clear();
        print();
        setTimeout(() => {
          console.log(
            "#-----------------------------------------------------------#"
          );
          console.log(`Місце - ${this.place}`);
          console.log(this.description);
          console.log(this.textOfTask);
          console.log(this.variantsOfChoice);
          let variant = prompt("Enter number: ");
          console.clear();
          player = this.variantsOfChoiceFunction(variant, player);
          return player;
        }, 500);
      },
    },
    {
      name: "Печера Громових Ящерів",
      place: "Печера, де живуть магічні ящери, які можуть викликати грім.",
      description:
        "Герой знаходить печеру, де живуть громові ящери. Вони спочатку вороже налаштовані.",
      variantsOfChoice:
        "Variant: \n" + "(1) - Захистити(-10hp)\n" + "(2) - Піти далі\n",
      textOfTask: "Ящери пропонують вам захистити їх від мисливців",
      descriptionAfterTask:
        "Вдячні ящери дарують герою чарівні чоботи, що збільшують його ловкість(+2), дозволяючи швидше рухатися і ухилятися від нападів.",
      result:
        "Герой отримує чоботи, що збільшують його ловкість, і здобуває можливість швидше пересуватися та уникати небезпек.",
      task: true,
      instructions: 1,
      variantsOfChoiceFunction(variant, player) {
        let number = +variant;
        switch (number) {
          case 1:
            console.log("Ви захистили ящерів\n" + this.descriptionAfterTask);
            player.decreaseHp(10);
            player.increaseDexterity(2);
            player.increaseInstructions(this.instructions);
            return player;
          case 2:
            console.log("Вони вас вдарили блискавою(hp -20)");
            player.decreaseHp(20);
            return player;
          default:
            console.log(chalk.red("Please enter valid number!"));
            setTimeout(() => {
              this.taskForPlayer(player);
            }, 1500);
            break;
        }
      },
      taskForPlayer(player) {
        console.clear();
        print();
        setTimeout(() => {
          console.log(
            "#-----------------------------------------------------------#"
          );
          console.log(`Місце - ${this.place}`);
          console.log(this.description);
          console.log(this.textOfTask);
          console.log(this.variantsOfChoice);
          let variant = prompt("Enter number: ");
          console.clear();
          player = this.variantsOfChoiceFunction(variant, player);
          return player;
        }, 500);
      },
    },
];
const executeAllTasksRandomly = (player) => {
  while (actionsForFindingTraces.length > 0) {
    let index = getRandomArbitrary(0, actionsForFindingTraces.length - 1);
    let action = actionsForFindingTraces[index];

    if (action.task) {
      action.taskForPlayer(player);
    } else {
      action.showInformation(player);
    }
    // Удаляем выполненное задание из списка
    actionsForFindingTraces.splice(index, 1);
  }
  return player;
}

export {executeAllTasksRandomly};