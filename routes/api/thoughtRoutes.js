const router = require('express').Router();
const {getAllThoughts, getThoughById,
        postNewThought, updateThought,
        deleteThought, postReaction, deleteReaction} = require('../../controllers/thoughtController.js');

router
    .route('/')
    .get(getAllThoughts)
    .post(postNewThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId').get(getThoughById);

router
    .route('/:thoughtId/reactions')
    .post(postReaction)
    .delete(deleteReaction);

    
module.exports = router;