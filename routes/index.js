var express = require('express');
var router = express.Router();

const control = require('../controllers/travels')

router.get('/', async (req, res, next) => {
  let travels = await control.getTravels()

  res.render('travels/index', {
    travels
  })
})

router.get('/travels/add', (req, res) => {
  res.render('form')
})

router.get('/travels/edit/:idTravel', async (req, res) => {
  let travelById = await control.travelByID(req.params.idTravel)
  console.log(travelById)
  res.render('formEdit', {
    travelById: travelById[0]
  })
})

module.exports = router;