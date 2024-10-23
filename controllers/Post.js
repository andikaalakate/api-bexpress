
const { 
    insertPost, 
    getPosts, 
    getPost, 
    updatePost, 
    deletePost 
} = require('../models/Post');

// create Post
exports.createData = (req, res) => {
    const data = { ...req.body };
    insertPost(res, data);
};

exports.readDatas = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;
    getPosts(res, limit, offset);
};

exports.readData = (req, res) => {
    getPost(res, req.params.id);
};

exports.updateData = (req, res) => {
    const data = { ...req.body };
    updatePost(res, req.params.id, data);
};

exports.deleteData = (req, res) => {
    deletePost(res, req.params.id);
};
    