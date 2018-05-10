// TODO: need to TDD this spike

const employees = [
  {
    id: 0,
    firstName: "Dave"
  },
  {
    id: 1,
    firstName: "Tim",
    reportToId: 0
  },
  {
    id: 2,
    firstName: "Racheal",
    reportToId: 0
  },
  {
    id: 3,
    firstName: "Amber",
    reportToId: 0
  }
];

const employeeMap = createEmployeeMap(employees);
const rootEmployee = employeeMap.get(0);

createOrgHierarchy(rootEmployee);
printOrgHierarchy(rootEmployee, 0);

function createEmployeeMap(employees){
  const map = new Map();

  employees.map((employee, e) => {
    const { id, firstName, reportToId } = employee;

    map.set(id, {
      id,
      firstName,
      reportToId
    })
  });

  return map;
}

function getEmployeeSubordinatesById(employeeId){
  const subordinates = [];

  for(const [key, value] of employeeMap){

    if(value.reportToId === employeeId){
      subordinates.push(value);
    }
  }

  return subordinates;
}

function createOrgHierarchy(employee){
  const currentEmployee = employee;
  currentEmployee.subordinates = getEmployeeSubordinatesById(currentEmployee.id);

  const { subordinates } = currentEmployee;
  if(!subordinates){
    return;
  };

  // let scopes whatever to the loop's block scope
  for(let subordinate of subordinates){
    createOrgHierarchy(subordinate);
  };
}

function printOrgHierarchy(employee, level){
  const { subordinates } = employee;

  for(i=0; i < level; i++){
    console.log("\t")
  };

  console.log(employee.firstName)

  if(employee.id === 0){
    console.log("\t")
  }
  for(s of subordinates){
    printOrgHierarchy(s, level++);
  }
};