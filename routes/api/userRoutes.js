const router = require('express').Router();
const {getUsers, getUserById,
        postNewUser, updateUser, deleteUser,
        addNewFriend, deleteFriend} = require('../../controllers/userController.js');

router
    .route('/')
    .get(getUsers)
    .post(postNewUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId').get(getUserById);

router
    .route('/:userId/friends/:friendId')
    .post(addNewFriend)
    .delete(deleteFriend);


module.exports = router;