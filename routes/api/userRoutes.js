const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser, 
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

// http://localhost:3001/
// api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser)

// api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// api/users/:usersId/friends/:friendsId
router.route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router