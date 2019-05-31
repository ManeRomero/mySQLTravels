const bcrypt = require('bcrypt')

const connect = require('../helpers/connect_db')
const INSTRUCTION = require('../helpers/instructions_db')
const SALT_ROUNDS = 10

function signUpProccess(email, password, name){
    return new Promise( async (resolve, reject) => {
        let hash = await bcrypt.hash(password, SALT_ROUNDS )
        let user = {
            name,
            email,
            password: hash
        }
        connect.query(INSTRUCTION.insertUser, [user], (err, result) => {
            if(err){
                resolve(false)
            }else{
                resolve(true);
            }
        })
    })
}

function loginProccess(email, password){
    return new Promise((resolve, reject) => {
        const selectQuery = INSTRUCTION.selectMail ;
        connect.query(selectQuery, [email], (err, users) => {
            if(users.length === 0){
                resolve(null)
            }else{
                bcrypt.compare(password, users[0].password, (err, match) => {
                    resolve( match ? users[0] : null);
                })
            }
        })
    })
}

module.exports = {
    loginProccess,
    signUpProccess
}