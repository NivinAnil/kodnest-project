import Excel from 'exceljs';
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

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        console.log(rows);
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
                worksheet.addRow(keys);
                x = 1;
            }
            worksheet.addRow(values);
        });





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

