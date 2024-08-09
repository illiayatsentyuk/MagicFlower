import figlet from "figlet";


const printHelloMessage = () => figlet("Magic Flower", function (err, data) {
    if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
    }

    console.log(data);
});

export default printHelloMessage;