const jwt = require('jsonwebtoken')

const result = require('../utils/result')
const config = require('../utils/config')

function authorization(req, res, next) {
    if (req.url === '/user/registration' || req.url === '/user/login' || 
        req.url === '/registration' || req.url === '/login') {
        next()
    }
    else {
        const token = req.headers.token

        if (token) {
            try {
                const payload = jwt.verify(token, config.secret)

                req.headers.userId = payload.userId
                req.userId = payload.userId
                next()
            }
            catch (err) {
                res.send(result.createErrorResult('Token is not valid'))
            }
        }
        else {
            res.send(result.createErrorResult('token is missing'))
        }
    }
}

module.exports = authorization