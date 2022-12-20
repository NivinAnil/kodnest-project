
import mysql from 'mysql2';
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'KodNestProject',
  password: 'niv12345'
});

export default function handler(req, res) {
  try {
    const email = req.query.email;
    connection.execute(
      'SELECT fName FROM `users` where email=?',
      [email],
      function (err, results, fields) {
        if (results.length == 1)
          res.status(200).json({ result: true, name: results[0].fName })

      }
    );

  }
  catch (error) {
    res.status(200).json({ error: error.message })
  }
}

