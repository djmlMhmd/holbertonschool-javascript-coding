const http = require('http');
const url = require('url');
const fs = require('fs').promises;

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

// an app server
const app = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url).pathname;
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (reqUrl === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (reqUrl === '/students') {
    const path = process.argv[2];
    res.write('This is the list of our students\n');
    countStudents(path)
      .then((data) => {
        res.write(data.join('\n'));
        res.end();
      })
      .catch((err) => {
        res.write(err.message);
        res.end();
      });
  }
});

app.listen(1245);

module.exports = app;
