const router = require('express').Router();
const {addThought, getThought, getThoughtById, deleteThought, updateThought, addReaction} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getThought)
  .post(addThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/reaction/:id')
.post(addReaction);

// /api/comments/<pizzaId>/<commentId>
// router
//   .route('/:pizzaId/:commentId')
//   .put(addReply)
//   .delete(removeComment);

module.exports = router;
  