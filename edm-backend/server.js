require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authorization = require('./routes/authorization')
const userRouter = require('./routes/user')
const departmentRouter = require('./routes/department')
const positionRouter = require('./routes/position')
const employeeRouter = require('./routes/employee')


const app = express()

app.use(cors())
app.use(express.json())
app.use(authorization)


app.use('/user', userRouter)
app.use('/department', departmentRouter)
app.use('/position', positionRouter)
app.use('/employee', employeeRouter)

app.listen(process.env.PORT, 'localhost', () => {
    console.log('Server started on port 4000....')
})