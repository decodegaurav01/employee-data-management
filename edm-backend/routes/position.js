const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')
const router = express.Router()

router.get('/:department_id', (req, res) => {


    const sql = `select * from positions where department_id =?`

    pool.query(sql, [req.params.department_id], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/add', (req, res) => {
    const sql = `insert into positions (title,department_id, company_id) values(?,?,?)`

    pool.query(sql, [req.body.title, req.body.department_id, req.userId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

module.exports = router