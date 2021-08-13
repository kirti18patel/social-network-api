const { Thought, User } = require('../models');

const thoughtController = {
    addThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
          User.findByIdAndUpdate(body.userId, {$push: {thoughts: dbThoughtData._id }})
          .then(dbUserData => res.json(dbUserData)) 
        })
        .catch(err => res.status(400).json(err));
    },

    getThought(req, res) {
        Thought.find()
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .select('-__v')
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
        )
        .then(dbReactionData => {
            if (!dbReactionData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
            }
            res.json(dbReactionData);
        })
        .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
          )
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.json(err));
    }
  }

module.exports = thoughtController;
