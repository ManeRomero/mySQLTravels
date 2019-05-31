const select = "SELECT * FROM viaje"
const selectByID = "SELECT * FROM viaje WHERE id = ?"
const insert = "INSERT INTO viaje SET ?"
const selectMail = "SELECT * FROM users WHERE email = ?"
const insertUser = 'INSERT INTO users SET ?'

module.exports = {
    select,
    insert,
    selectByID,
    selectMail,
    insertUser
}