const controller = require('../Controllers/users');
const verify = require('../middlewares/verifyUsers');
const router = require('express').Router();

// CRUD
router
  .get('/all', controller.getAll)
  .post('/', verify.getExistUser, controller.createOne)
  .get('/one', verify.getOneByEmail, controller.getOne)
  .put('/:id', controller.updateOne)
  .delete('/:id', controller.deleteOne);

module.exports = router;
