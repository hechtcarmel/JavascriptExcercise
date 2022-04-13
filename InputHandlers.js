const prompt = require("prompt-sync")({ sigint: true });

async function handleUserInput(employeesData, equipmentData) {
    const employeesIdMap = new Map(
        employeesData.map((employee) => [employee.id, employee])
    );

    while (true) {
        console.log('\nPlease enter your command ( "help" to get help. Duh):\n');

        const input = prompt("Command: ", "").split(" ");
        const command = input[0];
        const arg = input[1] ? input[1] : "";

        switch (command) {
            case "help":
                handleHelpCommand();
                break;
            case "salary":
                printSalaryOfEmployee(employeesIdMap, arg);
                break;
            case "city":
                printTotalSalaryOfCity(employeesData, arg);
                break;
            case "equipment":
                printEquipmentByCatalogNum(equipmentData, arg);
                break;
            case "allCitiesSalary":
                await printTotalSalaryOfAllCities(employeesData);
                break;
            case "equipment":
                printEquipmentByCatalogNum(equipmentData, arg);
                break;
            case "employeeEquipment":
                printEmployeeEquipment(employeesIdMap, equipmentData, arg);
                break;
            case "equipmentAttribute":
                console.log("Arg = ", arg);
                printEquipmentsWithAttribute(equipmentData, arg);
                break;
            case "above":
                printEmployeesWhoEarnedAboveThreshold(employeesData, arg);
                break;

            case "exit":
                handleExitCommand();
                break;
            default:
                handleCommandNotFound();
                break;
        }
    }
}

async function printTotalSalaryOfAllCities(employeesData) {
    let cities = new Set(employeesData.map((employee) => employee.city));
    let promises = [];
    cities.forEach((city) => {
        promises.push(getCitySalary(employeesData, city));
    });

    const results = await Promise.all(promises);
    let allCitiesSalary = 0;

    console.log("Salary of each city: ");
    results.forEach(({ city, totalSalary }) => {
        console.log(`${city}: ${totalSalary}`);
        allCitiesSalary += totalSalary;
    });

    console.log(`Total salary from all cities: ${allCitiesSalary}`);
}

async function getCitySalary(employeesData, city) {
    city = city.toLowerCase();
    let totalSalary = 0;
    employeesData.forEach((employee) => {
        if (employee.city.toLowerCase() === city) {
            const currTotalSalary = calcTotalSalary(employee.salary);

            totalSalary += currTotalSalary;
        }
    });
    return { city, totalSalary };
}

function printEquipmentsWithAttribute(equipmentData, attribute) {
    attribute = attribute.toLowerCase();
    //check if attribute is valid
    let equipmentsWtihAttribute = equipmentData.filter((equipment) => {
        return equipment.attributes
            .map((att) => att.toLowerCase())
            .includes(attribute);
    });

    if (equipmentsWtihAttribute) {
        console.log(`Equipments with attribute ${attribute} are: `);
        console.log(equipmentsWtihAttribute);
    } else {
        console.log("Sorry, there is no equipment with this attribute.");
    }
}

function printEmployeeEquipment(employeesIdMap, equipmentData, id) {
    id = parseInt(id);

    //check if id is valid
    if (!employeesIdMap.has(id)) {
        console.log("Sorry, " + id + " is not a valid id.");
        return;
    }

    const employee = employeesIdMap.get(id);

    const equipment = equipmentData.filter((equipment) => {
        return employee.equipmentIds.includes(equipment.catalogNumber);
    });

    console.log(`Equipment of employee with id ${id}: `);
    console.log(equipment);
}

function printEquipmentByCatalogNum(equipmentData, catalogNum) {
    catalogNum = parseInt(catalogNum);

    //check if catalogNum is valid
    let equipment = equipmentData.find((equipment) => {
        return equipment.catalogNumber === catalogNum;
    });

    console.log(`Catalog number: ${equipment.catalogNumber}`);
    console.log(`Type: ${equipment.type}`);
    console.log(`Attributes: ${equipment.attributes}`);
}

function handleCommandNotFound() {
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
    console.log("equipment <catalog number> - shows the equipment info");
    console.log("exit - exits the program");
}

function handleExitCommand() {
    console.log("Exiting...");
    process.exit(0);
}

function printTotalSalaryOfCity(employeesData, city) {
    city = city.toLowerCase();
    let totalSalary = 0;
    employeesData.forEach((employee) => {
        if (employee.city.toLowerCase() === city) {
            const currTotalSalary = calcTotalSalary(employee.salary);

            totalSalary += currTotalSalary;
        }
    });

    console.log(`Total salary of all employees in ${city} is ${totalSalary}`);
}

function printEmployeesWhoEarnedAboveThreshold(employeesData, threshold) {
    threshold = parseInt(threshold);
    //check if above is valid
    if (!Number.isInteger(threshold)) {
        console.log("Invalid salary");
        return;
    }

    console.log(`Employes who earned above ${threshold}: `);
    console.log(employeesData);
    employeesData.forEach((employee) => {
        const totalSalary = calcTotalSalary(employee.salary);
        if (totalSalary > threshold) {
            console.log(employee.id + " - " + totalSalary);
        }
    });
}

function printSalaryOfEmployee(employeesIdMap, id) {
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
    const totalSalary = calcTotalSalary(employee.salary);

    console.log(`Total salary of employee with id ${id} is ${totalSalary}`);
    console.log(`Basic salary of employee with id ${id} is ${basicSalary}`);
    console.log(`Stock salary of employee with id ${id} is ${stockSalary}`);
    console.log(`Bonus salary of employee with id ${id} is ${bonusSalary}`);
}

function calcTotalSalary(salary) {
    return salary.basic + salary.stock + salary.bonus;
}

exports.handleUserInput = handleUserInput;