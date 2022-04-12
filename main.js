
const fs = require('fs');
const DataGenerator = require('./DataGenerator');
const {handleUserInput}  = require("./handleUserInput");


function main(){

    DataGenerator.generateData();
    const employeesRawData = fs.readFileSync('./data/employees.json', {encoding: 'utf8', flag:'r'})
    const employeesData = JSON.parse(employeesRawData).employees;
    const employeesIdMap = new Map(employeesData.map(employee => [employee.id, employee]));

    while(true){
        handleUserInput(employeesData, employeesIdMap);
    }
}

main()


