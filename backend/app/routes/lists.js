const controller = require('../Controllers/lists');
const router = require('express').Router();

//CRUD
router
  .get('/:id', controller.getOneByPk)
  .get('/', controller.getOneByName)
  .get('/:id/all', controller.getAll)
  .post('/:id', controller.insertOnePerson)
  .post('/:id/contact', controller.insertOneContact)
  .put('/:id', controller.updatePerson)
  .put('/:id/contact', controller.updateContact)
  .delete('/:id', controller.deletePerson)
  .delete('/:id/contact', controller.deleteOneContact)
  .delete('/:id/all/contact', controller.deleteAllContact);

module.exports = router;
