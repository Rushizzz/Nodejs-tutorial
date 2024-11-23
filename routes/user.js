const  express = require('express');
const { handleGetAllUsers, handleUserUpdate, handleGetUserById, handleUserDelete, handleCreateUser } = require('../controllers/user')
const  router = express.Router();

router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser);

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUserUpdate)
    .delete(handleUserDelete);

module.exports = router;