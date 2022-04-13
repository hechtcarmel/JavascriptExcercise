const fs = require("fs");
const DataGenerator = require("./DataGenerator");
const InputHandlers = require("./InputHandlers");

main();

async function main() {
    DataGenerator.generateData();
    const { employeesData, equipmentData } = readData();
    await InputHandlers.handleUserInput(employeesData, equipmentData);
}

function readData() {
    const employeesRawData = fs.readFileSync("./data/employees.json", {
        encoding: "utf8",
        flag: "r",
    });
    const employeesData = JSON.parse(employeesRawData).employees;

    const equipmentRawData = fs.readFileSync("./data/equipment.json", {
        encoding: "utf8",
        flag: "r",
    });
    const equipmentData = JSON.parse(equipmentRawData).equipment;

    return { employeesData, equipmentData };
}