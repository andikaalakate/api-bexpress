
const koneksi = require('../config/database');
const { responseData, responseMessage } = require('../utils/response-handler');

// Insert User
exports.insertUser = async (response, data) => {
    try {
        await koneksi.user.create({ data });
        responseMessage(response, 201, 'Berhasil insert data!');
    } catch (err) {
        response.status(500).json({ message: 'Gagal insert data!', error: err });
    }
};

// Get Users with pagination
exports.getUsers = async (response, limit, offset) => {
    try {
        const totalData = await koneksi.user.count();
        const users = await koneksi.user.findMany({ skip: offset, take: limit });
        const totalPages = Math.ceil(totalData / limit);
        responseData(response, 200, users, 
            {
                dataPerPage: limit,
                totalData,
                totalPages
            },
            {
                currentPage: offset / limit + 1,
                nextPages: {
                    page: offset + limit < totalData ? offset + limit + 1 : null,
                    url: offset + limit < totalData ? `/v1/user?page=${offset + limit + 1}&limit=${limit}` : null
                },
                prevPages: {
                    page: offset - limit >= 0 ? offset - limit + 1 : null,
                    url: offset - limit >= 0 ? `/v1/user?page=${offset - limit + 1}&limit=${limit}` : null
                },
            }
        );
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan saat mengambil data', error: err });
    }
};

// Get single User
exports.getUser = async (response, id) => {
    try {
        const data = await koneksi.user.findUnique({ where: { id: Number(id) } });
        if (data) {
            responseData(response, 200, data);
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Update User
exports.updateUser = async (response, id, data) => {
    try {
        const item = await koneksi.user.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.user.update({ where: { id: Number(id) }, data });
            responseMessage(response, 200, 'Berhasil update data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Delete User
exports.deleteUser = async (response, id) => {
    try {
        const item = await koneksi.user.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.user.delete({ where: { id: Number(id) } });
            responseMessage(response, 200, 'Berhasil hapus data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};
    