const fs = require("fs");
const DataGenerator = require("./DataGenerator");
const InputHandlers = require("./InputHandlers");

function main() {
  DataGenerator.generateData();
  const employeesRawData = fs.readFileSync("./data/employees.json", {
    encoding: "utf8",
    flag: "r",
  });
  const employeesData = JSON.parse(employeesRawData).employees;

  InputHandlers.handleUserInput(employeesData);
}

main();
