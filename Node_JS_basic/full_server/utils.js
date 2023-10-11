const fs = require('fs').promises;

async function readDatabase(path) {
  // get the file data asynchronously
  return fs
    .readFile(path, 'utf8')
    .then((data) => {
      // convert data to string
      const stringData = data.toString();

      // convert data to array and slice the first line containing col descriptions
      const arrayData = stringData.split('\n').slice(1);

      // remove empty lines
      const filteredArrayData = arrayData.filter((line) => line !== '');

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
      return namesByField;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = readDatabase;
