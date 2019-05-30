const CONNECT_DB = require('../helpers/connect_db')
const INSTRUCTION = require('../helpers/instructions_db')

function getTravels() {
    return new Promise((resolve, reject) => {
        CONNECT_DB.query(INSTRUCTION.select, (error, travels) => {
            resolve(travels)
        })
    })
}

function travelByID(id) {
    return new Promise((resolve, reject) => {
        CONNECT_DB.query(INSTRUCTION.selectByID, id, (error, travel) => {
            resolve(travel)
        })
    })
}

function addTravel(travel) {
    return new Promise((resolve, reject) => {
        CONNECT_DB.query(INSTRUCTION.insert, [travel], (err, result) => {
            CONNECT_DB.query(INSTRUCTION.selectByID, [result.insertId], (selErr, travel) => {
                resolve(travel[0]);
            })
        })
    })
}

module.exports = {
    getTravels,
    travelByID,
    addTravel,
}