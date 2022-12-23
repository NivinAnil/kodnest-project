
import mysql from 'mysql2';
import connection from './connection';
// create the connection to database


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
        if (results && results.length != 0)
          res.status(200).json({ result: true, name: results[0].fName })
        else
          res.status(200).json({ result: false, name: "" })

      }
    );

  }
  catch (error) {
    res.status(200).json({ error: error.message })
  }
}

