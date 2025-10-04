const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require("../utils/result")
const config = require("../utils/config")


const router = express.Router()

router.post('/registration', (req, res) => {
    const { company_name,
        email,
        password, } = req.body

    const encryptedPassword = String(cryptoJs.SHA256(password))

    const sql = `insert into users(company_name , email, password) values(?,?,?)`

    pool.query(
        sql,
        [company_name, email, encryptedPassword],
        (error, data) => {
            res.send(result.createResult(error, data))
          
        }
    )
})


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const encryptedPassword = String(cryptoJs.SHA256(password));

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    pool.query(sql, [email, encryptedPassword], (error, data) => {
        if (error) {
            return res.send(result.createErrorResult(error));
        }

        if (data && data.length > 0) {
            const payload = {
                userId: data[0].id,
            };

            const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });

            const body = {
                token: token,
                
                company_name: data[0].company_name,
                email: data[0].email,
            };

            res.send(result.createSuccessResult(body));
        } else {
            res.status(401).json(result.createErrorResult("Invalid credentials"));
        }
    });
});


module.exports = router