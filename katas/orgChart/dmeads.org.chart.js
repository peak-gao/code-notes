function buildOrg(records) {
  let org = {};

  function updateOrg(name, attributes) {
    org[name] = Object.assign(org[name] || {}, attributes);
  }

  records
    .forEach(record => {
      let [name, ...reports] = record.split(' ');

      updateOrg(name, {name, reports});

      reports.forEach(report => updateOrg(report, {boss: name}));
    });

  return org;
}

function getBoss(org) {
  return Object.values(org).filter(record => !record.boss)[0];
}

function printOrg(name) {
  let line = '';
  let boss = org[name].boss;
  while (boss) {
    line += '---';
    boss = org[boss].boss;
  }
  if (line.length > 0) {
    line += ' ';
  }
  console.log(line + name);
  org[name].reports.forEach(report => printOrg(report));
}

const org = buildOrg([
  'David Jan',
  'Dwight',
  'Jan Michael Jim',
  'Jim Stanley Oscar Phyllis',
  'Michael Dwight',
  'Oscar',
  'Phyllis',
  'Stanley'
]);

printOrg(getBoss(org).name);