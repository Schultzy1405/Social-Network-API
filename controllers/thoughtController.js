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
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
