
import mysql from 'mysql2';
// create the connection to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.password
});

export default function handler(req, res) {
  try {
    const email = req.query.email;
    const password = req.query.password;
    connection.execute(
      'SELECT * FROM `users` where email=? and pd=?',
      [email, password],
      function (err, results, fields) {
        if (results.length == 1)
          res.status(200).json({ result: true, email: email })
        else
          res.status(200).json({ result: false, email: email })
      }
    );

  }
  catch (error) {
    res.status(200).json({ error: error.message })
  }
}

