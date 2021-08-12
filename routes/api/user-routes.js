const router = require('express').Router();
const {addUser, getUser, getUserById, deleteUser, updateUser} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getUser)
  .post(addUser);

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;
  