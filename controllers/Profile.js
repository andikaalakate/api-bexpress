
const { 
    insertProfile, 
    getProfiles, 
    getProfile, 
    updateProfile, 
    deleteProfile 
} = require('../models/Profile');

// create Profile
exports.createData = (req, res) => {
    const data = { ...req.body };
    insertProfile(res, data);
};

exports.readDatas = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;
    getProfiles(res, limit, offset);
};

exports.readData = (req, res) => {
    getProfile(res, req.params.id);
};

exports.updateData = (req, res) => {
    const data = { ...req.body };
    updateProfile(res, req.params.id, data);
};

exports.deleteData = (req, res) => {
    deleteProfile(res, req.params.id);
};
    