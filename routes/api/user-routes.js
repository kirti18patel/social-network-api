const router = require('express').Router();
const {addUser, 
    getUser, 
    getUserById, 
    deleteUser, 
    updateUser,
    addFriend,
    removeFriend } = require('../../controllers/user-controller');

router
  .route('/')
  .get(getUser)
  .post(addUser);

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends')
.post(addFriend);

router.route('/:userId/friends/:friendId')
.delete(removeFriend);

module.exports = router;
  