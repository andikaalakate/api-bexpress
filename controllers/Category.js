
const { 
    insertCategory, 
    getCategorys, 
    getCategory, 
    updateCategory, 
    deleteCategory 
} = require('../models/Category');

// create Category
exports.createData = (req, res) => {
    const data = { ...req.body };
    insertCategory(res, data);
};

exports.readDatas = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;
    getCategorys(res, limit, offset);
};

exports.readData = (req, res) => {
    getCategory(res, req.params.id);
};

exports.updateData = (req, res) => {
    const data = { ...req.body };
    updateCategory(res, req.params.id, data);
};

exports.deleteData = (req, res) => {
    deleteCategory(res, req.params.id);
};
    