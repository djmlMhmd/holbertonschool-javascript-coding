// import a module needed to work with files
const fs = require('fs');

function countStudents(path) {
  let data = '';

  // get the file data synchronously
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  // convert data to string
  const stringData = data.toString();

  // convert data to array and slice the first line containing col descriptions
  const arrayData = stringData.split('\n').slice(1);

  // remove empty lines
  const filteredArrayData = arrayData.filter((line) => line !== '');

  // print the first message and count students
  console.log(`Number of students: ${filteredArrayData.length}`);

  // creates an object to store names by field
  const namesByField = {};

  // for each line, fill the namesByField object
  filteredArrayData.forEach((line) => {
    // split each string into an array
    const parts = line.split(',');
    // ge the first name and the field
    const firstName = parts[0];
    const field = parts[3];

    // check if the field already exists and if not create an empty array as value
    if (!namesByField[field]) {
      namesByField[field] = [];
    }

    // push the name associated with the field into the array
    namesByField[field].push(firstName);
  });

  // print the customized message
  const fields = Object.keys(namesByField);
  for (const field of fields) {
    const names = namesByField[field];
    const count = names.length;
    const list = names.join(', ');
    console.log(`Number of students in ${field}: ${count}. List: ${list}`);
  }
}

module.exports = countStudents;
