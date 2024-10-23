
const { 
    createData, 
    readDatas, 
    readData, 
    updateData, 
    deleteData 
} = require('../controllers/Category');

const express = require('express');
const router = express.Router();

router.route('/')
    .post(createData)
    .get(readDatas);

router.route('/:id')
    .get(readData)
    .put(updateData)
    .delete(deleteData);

module.exports = router;
    