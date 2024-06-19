const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThought).post(createThought);
// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route("/api/thoughts/:thoughtId/reactions")
  .post(createReaction)
  .delete(removeReaction);

module.exports = router;
