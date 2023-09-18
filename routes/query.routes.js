const express = require('express');
const router = express.Router();
const { queryController } = require('../controllers/index.controller');
const { validateQuery } = require('../middleware/validations/queryValidation.mdw');

router.post("/", validateQuery, queryController.createQuery); 


module.exports = router;