import connection from './connection';

export default function handler(req, res) {
  try {
    const email = req.query.email;
    const password = req.query.password;

    if (!email || !password) {
      res.status(200).json({ result: false, email: email })
    }

    connection.query(
      'SELECT * FROM user_info where email=? and password=?',
      [email, password],
      function (err, results, fields) {
        console.log(results);
        if (results.length != 0)
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

