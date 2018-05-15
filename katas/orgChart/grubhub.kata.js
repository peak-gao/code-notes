// Who's the boss?
//
// Imagine you have an employee org chart. For every employee, they
// may or may not have one or more direct reports. Every employee
// except for one (the head of the company) has a boss.
//
//
//              David
//                |
//               Jan
//             /     \
//       Michael       Jim
//         /        /   |   \
//    Dwight  Stanley Oscar Phyllis
//
//
// The problem:
//
// Your HR database containing your entire org chart was corrupted and
// no one knows who reports to whom anymore!
//
// The good news is, before the database was corrupted, you were able
// to extract your org chart as an array of strings in the given
// format:
//
//     [
//          "David Jan",
//          "Dwight",
//          "Jan Michael Jim",
//          "Jim Stanley Oscar Phyllis",
//          "Michael Dwight",
//          "Oscar",
//          "Phyllis",
//          "Stanley"
//     ]
//
// Each string in the array corresponds to an employee in the org. If
// the string contains multiple names (separated by a space), the
// first name is the employee’s name, and the rest of the names are
// their direct reports.
//
// Use this array to:
//   - Populate a data structure appropriate for storing an org chart.
//     It should be such a data structure that makes it easy to
//     identify who reports to whom.
//
//   - Print the org chart, looking similar to this format:
//
//     David
//     --- Jan
//     ------ Michael
//     --------- Dwight
//     ------ Jim
//     --------- Stanley
//     --------- Oscar
//     --------- Phyllis


const list = [
  "David Jan",
  "Dwight",
  "Jan Michael Jim",
  "Jim Stanley Oscar Phyllis",
  "Michael Dwight",
  "Oscar",
  "Phyllis",
  "Stanley"
];

const hierarchy = employeeMap(list),
  rootEmployee = hierarchy.get(0);

printOrgChart(hierarchy);


function employeeMap(list){
  const map = new Map();
  let employee;

  for(let i of list) {
    const relation = i.split(" "),
      subordinates = getSubordinatesOfEmployee(relation),
      subordinateNodes = subordinates.map((subordinate, i) => {

        return createEmployeeNode(subordinate)
      })

    const employeeNode = createEmployeeNode(relation[0]);

    console.log(`employee: ${employeeNode.name}`)

    map.set(employeeNode, subordinateNodes);
  }


  console.log(map)
  return map;
}


function getSubordinatesOfEmployee(relation){
  let subordinates
  const hasSubordinates = relation.length > 0;

  if(hasSubordinates){
    subordinates = relation.slice(1, relation.length);
    return subordinates;
  }

  subordinates = null;

  return subordinates;
}

function createEmployeeNode(employee){
  return {
    name: employee
  };
}

function printChart(){

}



