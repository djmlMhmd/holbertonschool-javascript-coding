const readDatabase = require('../utils');

const path = process.argv[2];

class StudentsController {
  static getAllStudents(request, response) {
    response.status(200);
    readDatabase(path)
      .then((data) => {
        const fields = Object.keys(data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        const results = ['This is the list of our students'];
        for (const field of fields) {
          const names = data[field];
          const count = names.length;
          const list = names.join(', ');
          results.push(
            `Number of students in ${field}: ${count}. List: ${list}`,
          );
        }
        response.send(results.join('\n'));
      })
      .catch((err) => {
        response.status(500);
        response.send(err.message);
      });
  }

  static getAllStudentsByMajor(request, response) {
    response.status(200);
    const requestUrl = request.params.major;
    const match = requestUrl.match(/CS|SWE/);
    if (!match) {
      response.status(500);
      response.send('Major parameter must be CS or SWE');
    }
    readDatabase(path)
      .then((data) => {
        const namesList = data[match];
        response.send(`List: ${namesList.join(', ')}`);
      })
      .catch((err) => {
        response.status(500);
        response.send(err.message);
      });
  }
}
module.exports = StudentsController;
