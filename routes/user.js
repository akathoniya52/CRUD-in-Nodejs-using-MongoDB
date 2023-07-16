const express = require('express')
const router = express.Router();
const { handleGetAllUsers, getUserById, updateUserById, deleteUserById, createUser  } = require('../controllers/user');


router
    .route('/')
    .get(handleGetAllUsers)
    .post(createUser)


// Rest Api
router
    .route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports = router;