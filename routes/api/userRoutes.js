const router = require('express').Router();
const {getUsers, getUserById,
        postNewUser, updateUser, deleteUser,
        addNewFriend, deleteFriend} = require('../../controllers/userController.js');

router
    .route('/')
    .get(getUsers)
    .post(postNewUser);
    
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


router
    .route('/:userId/friends/:friendId')
    .post(addNewFriend)
    .delete(deleteFriend);


module.exports = router;