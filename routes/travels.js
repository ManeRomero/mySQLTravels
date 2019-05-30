var express = require('express');
var router = express.Router();
const control = require('../controllers/travels')

router.get('/:id', async (req, res) => {
  let travelByID = await control.travelByID(req.params.id)

  res.render('travels/detail', {
    travelByID
  })
})

router.post('/add', async (req, res) => {
  let travelById = await control.addTravel(req.body)
  res.render('travels/addOK', {
    travelById
  })
})

module.exports = router;