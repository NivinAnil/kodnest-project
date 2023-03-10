
import connection from './connection';

export default async function handler(req, res) {
    try {

        const rows = await new Promise((resolve, reject) => {
            connection.execute(
                'SELECT Fname,Lname,Email,Address,Gender,DOB FROM `user_info`',
                [],
                function (err, results, fields) {
                    if (results) {
                        console.log(results);
                        resolve(results);
                    }


                }
            );
        });

        const data = {
            keys: null,
            data: []
        }


        const keys = []
        let x = 0;
        rows.forEach((element, index) => {
            const values = []
            for (let i in element) {

                if (index == 0) {
                    keys.push(i);

                }
                values.push(element[i]);
            }
            if (x == 0) {
                data.keys = keys;
            }
            data.data.push(values)
        });



        console.log(data);
        res.status(200).json({ data: data })

    }
    catch (error) {
        res.status(200).json({ error: error.message })
    }
}

