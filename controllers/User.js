
const { 
    insertUser, 
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser 
} = require('../models/User');

// create User
exports.createData = (req, res) => {
    const data = { ...req.body };
    insertUser(res, data);
};

exports.readDatas = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;
    getUsers(res, limit, offset);
};

exports.readData = (req, res) => {
    getUser(res, req.params.id);
};

exports.updateData = (req, res) => {
    const data = { ...req.body };
    updateUser(res, req.params.id, data);
};

exports.deleteData = (req, res) => {
    deleteUser(res, req.params.id);
};
    