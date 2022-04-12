
const fs = require('fs');
const { mainModule } = require('process');
const readlineSync = require('readline-sync');
const DataGenerator = require('./DataGenerator');

let employeesData = null
let employeesIdMap = null


function main(){

    DataGenerator.generateData();
    const employeesRawData = fs.readFileSync('./data/employees.json', {encoding: 'utf8', flag:'r'})

    employeesData = JSON.parse(employeesRawData).employees;
    employeesIdMap = new Map(employeesData.map(employee => [employee.id, employee]));

    while(true){
        handleUserInput()
    }
}

function handleUserInput(){

    console.log("\n\nWelcome! Please enter your command or \"help\" to get help.\n\n");
    readlineSync.promptCL({
        help: handleHelpCommand,
        city: handleCityCommand,
        salary: handleSalaryCommand,
        above: handleAboveCommand,
        exit: handleExitCommand,
        _: handleCommandNotFount
    });
}


function handleCommandNotFount(){
    console.log('Sorry, the command is not available.');
}

function handleHelpCommand() {
    console.log("help - shows this help");
    console.log("salary <employee id> - shows the employee's salary");
    console.log("city <city> - shows total salary of all the employees in the city");
    console.log("above <salary> - shows the employee's who earn at least the given salary");
    console.log("exit - exits the program");
}

function handleExitCommand(){
    console.log("Exiting...");
    process.exit(0)
}

function handleCityCommand(city){
    city = city.toLowerCase()
    let totalSalary = 0;
    employeesData.forEach(employee => {
        if(employee.city.toLowerCase() === city){
            const currTotalSalary = calcTotalSalary(employee.salary)

            totalSalary += currTotalSalary;
        }
    });

    console.log(`Total salary of all employees in ${city} is ${totalSalary}`);

    
}

function handleAboveCommand(above){

    above = parseInt(above)
    //check if above is valid
    if(!Number.isInteger(above)){
        console.log("Invalid salary")
        return
    }

    console.log(`Employes who earned above ${above}: `)
    employeesData.forEach(employee => {
        if(employee.salary > above){
            console.log(employee.name + " - " + employee.salary)
        }
    })

}

function handleSalaryCommand(id){
    id = parseInt(id)

    //check if id is valid
    if(!employeesIdMap.has(id)){
        console.log("Sorry, " + id + " is not a valid id.")
        return
    }

    const  employee = employeesIdMap.get(id)
    const basicSalary = employee.salary.basic
    const stockSalary = employee.salary.stock
    const bonusSalary = employee.salary.bonus
    const totalSalary = calcTotalSalary(employee.salary)

    console.log(`Total salary of employee with id ${id} is ${totalSalary}`);
    console.log(`Basic salary of employee with id ${id} is ${basicSalary}`);
    console.log(`Stock salary of employee with id ${id} is ${stockSalary}`);
    console.log(`Bonus salary of employee with id ${id} is ${bonusSalary}`);

}

function calcTotalSalary(salary){
    return salary.basic + salary.stock + salary.bonus
}

main()


