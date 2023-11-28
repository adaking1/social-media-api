const router = require('express').Router();
const {getAllThoughts, getThoughtById,
        postNewThought, updateThought,
        deleteThought, postReaction, deleteReaction} = require('../../controllers/thoughtController.js');

router
    .route('/')
    .get(getAllThoughts)
    .post(postNewThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId').get(getThoughtById);

router
    .route('/:thoughtId/reactions')
    .post(postReaction)
    .delete(deleteReaction);

    
module.exports = router;