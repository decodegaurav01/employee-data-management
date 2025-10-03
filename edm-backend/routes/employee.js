const express = require('express')
const pool = require('../db/db')
const { createResult } = require('../utils/result')
const router = express.Router()



router.post('/add', (req, res) => {
    const {
        fullName,
        email,
        dob,
        joiningDate,
        salary,
        status,
        address,
        position,
        department
    } = req.body

    console.log('from backend: ', req.body)

    const sql = `insert into employees(name , email,dob,joining_date,salary,status,address,position_id,department_id,company_id) values(?,?,?,?,?,?,?,?,?,?)`

    pool.query(sql, [fullName, email, dob, joiningDate, salary, status, address, position, department, req.userId], (error, data) => {
        res.send(createResult(error, data))
    })
})

router.get('/getAll', (req, res) => {
    // const sql = `select e.* ,
    //  d.name as department_name ,
    // p.title as position_title 
    //  from employees e
    //  join departments d on e.department_id = d.id
    // join positions p on e.position_id = p.id 
    // where e.comapany_id = ?`

    // const sql = `SELECT 
    //                 e.*, 
    //                 d.name as department_name, 
    //                 p.title as position_title,

    //              FROM employees e 
    //              JOIN departments d ON e.department_id = d.id
    //              JOIN positions p ON e.position_id = p.id 

    //              WHERE e.company_id = ?`;
    const sql = `SELECT 
                    e.*, 
                    d.name as department_name, 
                    p.title as position_title
                 FROM employees e 
                 LEFT JOIN departments d ON e.department_id = d.id
                 LEFT JOIN positions p ON e.position_id = p.id 
                 WHERE e.company_id = ?`;


    // const sql = `select * from employees where company_id  =?`

    pool.query(sql, [req.userId], (error, data) => {
        res.send(createResult(error, data))
    })
})

router.get('/getById/:id', (req, res) => {
    const sql = `
    SELECT e.*, 
           d.name AS department_name, 
           p.title AS position_title
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    LEFT JOIN positions p ON e.position_id = p.id
    WHERE e.id = ?
  `;

    pool.query(sql, [req.params.id], (error, data) => {
        res.send(createResult(error, data))
    })
})

router.put('/update/:id', (req, res) => {

    const sql = `UPDATE employees 
                 SET dob = ?, salary = ?, status = ?, address = ?, 
                     department_id = ?, position_id = ?
                 WHERE id = ?`

    pool.query(sql, [req.body.dob,
    req.body.salary,
    req.body.status,
    req.body.address,
    req.body.department,
    req.body.position,
    req.params.id], (error, data) => {
        res.send(createResult(error, data))
    })


})

router.delete('/delete/:id', (req, res) => {
    const sql = `delete from employees where id = ?`

    pool.query(sql, [req.params.id], (error, data) => {
        res.send(createResult(error, data))
    })
})




module.exports = router