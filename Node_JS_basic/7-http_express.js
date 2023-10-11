const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

// a function that returns a promise
async function countStudents(path) {
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

      const results = [`Number of students: ${filteredArrayData.length}`];

      // print the customized message
      const fields = Object.keys(namesByField);
      for (const field of fields) {
        const names = namesByField[field];
        const count = names.length;
        const list = names.join(', ');
        results.push(
          `Number of students in ${field}: ${count}. List: ${list}`,
        );
      }
      return results;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}
// an express app basic route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// an express app custom route
app.get('/students', (req, res) => {
  const path = process.argv[2];
  countStudents(path)
    .then((data) => {
      res.send(`This is the list of our students\n${data.join('\n')}`);
    })
    .catch((err) => {
      res.send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(port);

module.exports = app;
