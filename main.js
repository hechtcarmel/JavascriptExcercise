const fs = require("fs");
const DataGenerator = require("./DataGenerator");
const InputHandlers = require("./InputHandlers");

function main() {
    DataGenerator.generateData();
    const { employeesData, equipmentData } = readData();
    InputHandlers.handleUserInput(employeesData, equipmentData);
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

    //console.log(employeesData.employees);
    return { employeesData, equipmentData };
}

main();