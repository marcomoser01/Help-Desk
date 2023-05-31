'use strict'

const mysql = require("mysql2/promise");
const DBConfig = require('../DatabaseConfig.json');

module.exports.insertTicket = async (event) => {
    const connection = await mysql.createConnection(DBConfig);

    try {

        let data = JSON.parse(event.body.trim());

        const [rows, fields] = await connection.execute(
            "INSERT INTO Ticket (username, ip_caller, ip_server, url_path_server, patient, hospital, department, description, valid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                data.username,
                data.ip_caller,
                data.ip_server,
                data.url_path_server,
                data.patient,
                data.hospital,
                data.department,
                data.description,
                data.valid,
            ]
        );
        connection.end();

        return {
            statusCode: 200,
            headers: {
                "Content-type": "application/json",

                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(rows, null, 2)
        };

    } catch (error) {
        connection.end();

        return {
            statusCode: 500,
            headers: {
                "Content-type": "application/json",

                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(error.message),
        }
    }
}