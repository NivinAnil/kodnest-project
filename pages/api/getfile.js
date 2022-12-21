import Excel from 'exceljs';
import connection from './connection';

export default async function handler(req, res) {
    try {
        const email = req.query.email;
        console.log(email);

        if (!email) {
            res.status(200).json({ result: false, email: email })
        }

        const rows = await new Promise((resolve, reject) => {
            connection.execute(
                'SELECT Fname,Lname,Email,Address,Gender,DOB FROM `user_info` where email=?',
                [email],
                function (err, results, fields) {
                    if (results) {
                        console.log(results);
                        resolve(results);
                    }


                }
            );
        });

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        console.log(rows);
        const keys = []
        const values = []
        for (let i in rows[0]) {
            keys.push(i)
            values.push(rows[0][i])
        }
        console.log(values);
        worksheet.addRow(keys);
        worksheet.addRow(values);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

        // Send the Excel file
        const buffer = await workbook.xlsx.writeBuffer();
        res.send(buffer);

    }
    catch (error) {
        res.status(200).json({ error: error.message })
    }
}

