'use strict'

const mysql = require("mysql2/promise");
const DBConfig = require('../DatabaseConfig.json');

module.exports.getTicket = async (event) => {
    const connection = await mysql.createConnection(DBConfig);

    try {
        const [rows, fields] = await connection.execute("SELECT * FROM Ticket");
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
            body: JSON.stringify(error.message),
            headers: {
                "Content-type": "application/json",

                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            }
        }
    }
}