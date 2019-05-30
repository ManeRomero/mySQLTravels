let select = "SELECT * FROM viaje"
let selectByID = "SELECT * FROM viaje WHERE id = ?"
let insert = "INSERT INTO viaje SET ?"

module.exports = {
    select,
    insert,
    selectByID
}