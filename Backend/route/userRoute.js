const express = require('express')
const router = express.Router();
const { createUser, updateUser, deleteUser, getAllUsers } = require('../controller/userController.js')

router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/', getAllUsers)

module.exports = router;