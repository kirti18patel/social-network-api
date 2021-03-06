const router = require('express').Router();
const {addThought, 
    getThought, 
    getThoughtById, 
    deleteThought, 
    updateThought, 
    addReaction,
    deleteReaction } = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getThought)
  .post(addThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
  