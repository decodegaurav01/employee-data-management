const express = require('express')
const pool = require('../db/db')
const { createResult } = require('../utils/result')
const router = express.Router()

router.get('/get', (req, res) => {
    const sql = `select * from departments where  company_id = ?`

    pool.query(sql, [req.userId], (error, data) => {
        res.send(createResult(error, data))
    })
})

router.get('/count', (req, res) => {
    const sql = `select count(*) as totalDept from departments where company_id =?`

    pool.query(sql, [req.userId], (error, data) => {
        res.send(createResult(error, data))
    })
})

router.post('/add', (req, res) => {
    const sql = `insert into departments (name,company_id) values(?,?)`
    pool.query(sql, [req.body.name, req.userId], (error, data) => {
        res.send(createResult(error, data))
    })
})

module.exports = router