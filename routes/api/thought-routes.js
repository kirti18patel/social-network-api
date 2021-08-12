const router = require('express').Router();
const {addThought, getThought, getThoughtById, deleteThought, updateThought} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getThought)
  .post(addThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

module.exports = router;
  