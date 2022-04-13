const readlineSync = require("readline-sync");

function handleUserInput(employeesData, equipmentData) {
    const employeesIdMap = new Map(
        employeesData.map((employee) => [employee.id, employee])
    );

    while (true) {
        console.log('\nPlease enter your command ( "help" to get help. Duh):\n');
        readlineSync.promptCL({
            help: handleHelpCommand,
            city: (city) => {
                handleCityCommand(employeesData, city);
            },

            salary: (catalogNum) => handleSalaryCommand(employeesIdMap, catalogNum),
            above: (aboveSalary) => handleAboveCommand(employeesData, aboveSalary),
            equipment: (id) => handleEquipmentCommand(equipmentData, id),
            employeeEquipment: (id) =>
                handleEmployeeEquipmentCommand(employeesIdMap, equipmentData, id),
            equipmentAttribute: (attribute) => {
                handleEquipmentAttributeCommand(equipmentData, attribute);
            },
            exit: handleExitCommand,
            _: handleCommandNotFound,
        });
    }
}

function handleEquipmentAttributeCommand(equipmentData, attribute) {
    attribute = attribute.toLowerCase();
    //check if attribute is valid
    let equipment = equipmentData.find((equipment) => {
        return equipment.attributes
            .map((att) => att.toLowerCase())
            .includes(attribute);
    });

    if (equipment) {
        console.log(`Equipment with attribute ${attribute} is: `);
        console.log(equipment);
    } else {
        console.log("Sorry, there is no equipment with this attribute.");
    }
}

function handleEmployeeEquipmentCommand(employeesIdMap, equipmentData, id) {
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

function handleEquipmentCommand(equipmentData, catalogNum) {
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

function handleCityCommand(employeesData, city) {
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

function handleAboveCommand(employeesData, above) {
    above = parseInt(above);
    //check if above is valid
    if (!Number.isInteger(above)) {
        console.log("Invalid salary");
        return;
    }

    console.log(`Employes who earned above ${above}: `);
    console.log(employeesData);
    employeesData.forEach((employee) => {
        const totalSalary = calcTotalSalary(employee.salary);
        if (totalSalary > above) {
            console.log(employee.id + " - " + totalSalary);
        }
    });
}

function handleSalaryCommand(employeesIdMap, id) {
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