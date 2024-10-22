const { 
    insertBlog, 
    getBlogs,
    getBlog, 
    updateBlog, 
    deleteBlog 
} = require('../models/Blog');

// create Blog
exports.createData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };

    // masukkan ke dalam model
    insertBlog(res, data);
};

exports.readDatas = (req, res) => {
    // ambil parameter halaman dan limit dari query string
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10; // default 10 data per halaman
    let offset = (page - 1) * limit;

    // masukkan ke dalam model dengan limit dan offset
    getBlogs(res, limit, offset);
};

// show Blog
exports.readData = (req, res) => {
    // masukkan ke dalam model
    getBlog(res, req.params.id);
};

// update Blog
exports.updateData = (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };

    // masukkan ke dalam model
    updateBlog(res, req.params.id, data);
};

// delete Blog
exports.deleteData = (req, res) => {
    // masukkan ke dalam model
    deleteBlog(res, req.params.id);
}