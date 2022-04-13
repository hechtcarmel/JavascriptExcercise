const { deepStrictEqual } = require("assert");
const fs = require("fs");
const Constants = require("./Constants");

function generateData() {
    console.log("Starting to generate data...");
    const numOfEmployees = 100;
    const numOfEquipmentIds = 100;

    let PreparedEmployees = {
        employees: [],
    };

    let Equipment = {
        equipment: [],
    };

    for (let i = 0; i < numOfEmployees; i++) {
        PreparedEmployees.employees.push({
            id: i,
            firstName: `FirstName  ${i}`,
            lastName: `LastName  ${i}`,
            yearOfBirth: Math.random() * (2000 - 1950) + 1950,
            gender: i % 2 ? "Male" : "Female",
            age: Math.floor(Math.random() * 100),
            salary: {
                basic: Math.floor(Math.random() * 100000),
                bonus: Math.floor(Math.random() * 100000),
                stock: Math.floor(Math.random() * 100000),
            },
            role: `Role #${i}`,
            city: i % 2 ? "London" : "Paris",
            equipmentIds: [],
        });
    }

    for (let i = 0; i < numOfEmployees; i++) {
        PreparedEmployees.employees[i].equipmentIds.push(
            Math.floor(Math.random() * numOfEquipmentIds)
        );
        PreparedEmployees.employees[i].equipmentIds.push(
            Math.floor(Math.random() * numOfEquipmentIds)
        );
        PreparedEmployees.employees[i].equipmentIds.push(
            Math.floor(Math.random() * numOfEquipmentIds)
        );
    }

    getRandomEquipmentType = () => {
        return EEquipmentTypes[
            Math.floor(Math.random() * (EEquipmentTypes.length - 1))
        ];
    };

    getRandomAttribute = () => {
        return EEquipmentAttributes[
            Math.floor(Math.random() * (EEquipmentAttributes.length - 1))
        ];
    };

    for (let i = 0; i < numOfEquipmentIds; i++) {
        Equipment.equipment.push({
            catalogNumber: i,
            type: getRandomEquipmentType(),
            attributes: [
                getRandomAttribute(),
                getRandomAttribute(),
                getRandomAttribute(),
            ],
        });
    }

    let PreparedEmployeesJson = JSON.stringify(PreparedEmployees, null, 2);
    let PreparedEquipmentJson = JSON.stringify(Equipment, null, 2);

    //console.log(PreparedEmployeesJson)
    fs.writeFileSync("./data/employees.json", PreparedEmployeesJson, {
        recursive: true,
    });

    fs.writeFileSync("./data/equipment.json", PreparedEquipmentJson, {
        recursive: true,
    });
    console.log("Generated data was saved to json file");
}

exports.generateData = generateData;

const EEquipmentTypes = [
    "Weapon",
    "Armor",
    "Gloves",
    "Shoes",
    "Calculator",
    "Shovel",
    "Glasses",
    "Mask",
    "Sword",
];

const EEquipmentAttributes = [
    "New",
    "Used",
    "Broken",
    "Sold",
    "FireResistant",
    "WaterResistant",
    "ElectricResistant",
    "PoisonResistant",
    "FrostResistant",
    "AcidResistant",
    "Dangerous",
];