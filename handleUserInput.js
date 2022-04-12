const readlineSync = require("readline-sync");

let employeesData = null;
let employeesIdMap = null;

function handleUserInput(employeesMapArg, employeesIdMapArg) {
  employeesData = employeesMapArg;
  employeesIdMap = employeesIdMapArg;

  console.log('\nPlease enter your command ( "help" to get help. Duh):\n');
  readlineSync.promptCL({
    help: handleHelpCommand,
    city: handleCityCommand,
    salary: handleSalaryCommand,
    above: handleAboveCommand,
    exit: handleExitCommand,
    _: handleCommandNotFount,
  });
}

function handleCommandNotFount() {
  console.log("Sorry, the command is not available.");
}
function handleHelpCommand() {
  console.log("help - shows this help. Duh.");
  console.log("salary <employee id> - shows the employee's salary");
  console.log(
    "city <city> - shows total salary of all the employees in the city"
  );
  console.log(
    "above <salary> - shows the employee's who earn at least the given salary"
  );
  console.log("exit - exits the program");
}
function handleExitCommand() {
  console.log("Exiting...");
  process.exit(0);
}
function handleCityCommand(city) {
  city = city.toLowerCase();
  let totalSalary = 0;
  employeesData.forEach((employee) => {
    if (employee.city.toLowerCase() === city) {
      const currTotalSalary = _calcTotalSalary(employee.salary);

      totalSalary += currTotalSalary;
    }
  });

  console.log(`Total salary of all employees in ${city} is ${totalSalary}`);
}
function handleAboveCommand(above) {
  above = parseInt(above);
  //check if above is valid
  if (!Number.isInteger(above)) {
    console.log("Invalid salary");
    return;
  }

  console.log(`Employes who earned above ${above}: `);
  console.log(employeesData);
  employeesData.forEach((employee) => {
    const totalSalary = _calcTotalSalary(employee.salary);
    if (totalSalary > above) {
      console.log(employee.id + " - " + totalSalary);
    }
  });
}
function handleSalaryCommand(id) {
  id = parseInt(id);

  //check if id is valid
  if (!employeesIdMap.has(id)) {
    console.log("Sorry, " + id + " is not a valid id.");
    return;
  }

  const employee = employeesIdMap.get(id);
  const basicSalary = employee.salary.basic;
  const stockSalary = employee.salary.stock;
  const bonusSalary = employee.salary.bonus;
  const totalSalary = _calcTotalSalary(employee.salary);

  console.log(`Total salary of employee with id ${id} is ${totalSalary}`);
  console.log(`Basic salary of employee with id ${id} is ${basicSalary}`);
  console.log(`Stock salary of employee with id ${id} is ${stockSalary}`);
  console.log(`Bonus salary of employee with id ${id} is ${bonusSalary}`);
}
function _calcTotalSalary(salary) {
  return salary.basic + salary.stock + salary.bonus;
}

exports.handleUserInput = handleUserInput;
