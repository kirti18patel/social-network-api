const { User,Thought } = require('../models');

const userController = {
    addUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    getUser(req, res) {
        User.find()
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
          path: 'friends',
          select: '-__v'
        })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            return Thought.deleteMany({username: dbUserData.username})
            .then(dbThoughtData => {
              if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
              }
              res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        })
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
    
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: body } },
            { new: true, runValidators: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
      },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: { friendId: params.friendId } } },
          { new: true }
        )
          .then(dbFriendData => res.json(dbFriendData))
          .catch(err => res.json(err));
      }
  }

module.exports = userController;
