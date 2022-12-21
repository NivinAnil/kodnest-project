
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

    if (!email) {
      res.status(200).json({ result: false, email: email })
    }
    connection.execute(
      'SELECT fName FROM `user_info` where email=?',
      [email],
      function (err, results, fields) {
        console.log({ name: results });
        if (results)
          res.status(200).json({ result: true, name: results[0].fName })

      }
    );

  }
  catch (error) {
    res.status(200).json({ error: error.message })
  }
}

