const router = require('express').Router();
const {getAllThoughts, getThoughtById,
        postNewThought, updateThought,
        deleteThought, postReaction, deleteReaction} = require('../../controllers/thoughtController.js');

router
    .route('/')
    .get(getAllThoughts)
    .post(postNewThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought); 

router
    .route('/:thoughtId/reactions')
    .post(postReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

    
module.exports = router;