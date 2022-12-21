import connection from "./connection";

export default function handler(req, res) {
    try {
        const email = req.query.email;
        const fName = req.query.fName;
        const lName = req.query.lName;
        const password = req.query.password;
        const DOB = req.query.DOB;
        const gender = req.query.gender;
        const address = req.query.address;
        console.log(req.query);
        // if (!email) {
        //     res.status(200).json({ result: false, email: email })
        // }

        // checking if email already exists
        connection.query(
            'SELECT * FROM `users` where email=?',
            [email, password],
            function (err, results, fields) {
                if (results && results.length != 0) {
                    res.status(200).json({ message: 'Mail already exists', status: false });
                    return;
                }
            }
        );


        const sql = 'INSERT INTO user_info (Fname,Lname,email,password,address,gender,DOB) VALUES (?, ?, ?, ?, ?, ?,?)';
        const values = [fName, lName, email, password, address, gender, DOB];

        connection.query(sql, values, function (error, results) {
            if (error) throw error;
            console.log('1 record inserted');
            res.status(200).json({ message: 'Registration successful...', status: true })
        });

        connection.end();
    }
    catch (error) {
        res.status(200).json({ error: error.message })
    }
}

