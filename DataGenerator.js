const fs = require("fs");

function generateData() {
  console.log("Starting to generate data...");

  let PreparedEmployees = {
    employees: [],
  };

  for (let i = 0; i < 100; i++) {
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
    });
  }

  let PreparedEmployeesJson = JSON.stringify(PreparedEmployees, null, 2);
  //console.log(PreparedEmployeesJson)
  fs.writeFileSync("./data/employees.json", PreparedEmployeesJson, {
    recursive: true,
  });
  console.log("Generated data was saved to json file");
}

exports.generateData = generateData;
