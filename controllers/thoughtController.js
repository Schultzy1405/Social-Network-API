const { Thought, User } = require("../models");

module.exports = {
  async getThought(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = await Thought.create({ thoughtText, username });
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json({ thought, user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json({ message: "Thought has been deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionId, reactionBody, username } = req.body;
      if (req.method === "POST") {
        // Create a new reaction
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $push: { reactions: { reactionId, reactionBody, username } } },
          { new: true }
        );
        res.json(updatedThought);
      } else if (req.method === "DELETE") {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $pull: { reactions: { reactionId } } },
          { new: true }
        );
        res.json(updatedThought);
      } else {
        res.status(400).json({ message: "Invalid request method" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const thoughtid = req.params;
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
