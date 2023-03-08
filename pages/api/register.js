import connection from "./connection";

export default function handler(req, res) {
    const email = req.query.email;
    const fName = req.query.fName;
    const lName = req.query.lName;
    const password = req.query.password;
    const DOB = req.query.DOB;
    const gender = req.query.gender;
    const address = req.query.address;
    console.log(req.query);
    try {

        connection.query(
            'SELECT * FROM user_info where email=?',
            [email],
            function (err, results, fields) {
                if (results.length != 0) {
                    console.log(results);
                    res.status(200).json({ message: 'Mail already exists', status: false });

                }
            }
        );


        const sql = 'INSERT INTO user_info (Fname,Lname,email,password,address,gender,DOB) VALUES (?, ?, ?, ?, ?, ?,?)';
        const values = [fName, lName, email, password, address, gender, DOB];

        connection.query(sql, values, function (error, results) {
            if (error) {
                console.log(error);
                res.status(200).json({ error: error, status: false })

                return;
            }
            console.log('1 record inserted');
            res.status(200).json({ message: 'Registration successful...', status: true })

        });


    }
    catch (error) {
        res.status(200).json({ error: error.message })

    }
}

