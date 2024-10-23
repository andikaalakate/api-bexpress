
const koneksi = require('../config/database');
const { responseData, responseMessage } = require('../utils/response-handler');

// Insert Post
exports.insertPost = async (response, data) => {
    try {
        await koneksi.post.create({ data });
        responseMessage(response, 201, 'Berhasil insert data!');
    } catch (err) {
        response.status(500).json({ message: 'Gagal insert data!', error: err });
    }
};

// Get Posts with pagination
exports.getPosts = async (response, limit, offset) => {
    try {
        const totalData = await koneksi.post.count();
        const posts = await koneksi.post.findMany({ skip: offset, take: limit });
        const totalPages = Math.ceil(totalData / limit);
        responseData(response, 200, posts,
            {
                dataPerPage: limit,
                totalData,
                totalPages
            },
            {
                currentPage: offset / limit + 1,
                nextPages: {
                    page: offset + limit < totalData ? offset + limit + 1 : null,
                    url: offset + limit < totalData ? `/v1/post?page=${offset + limit + 1}&limit=${limit}` : null
                },
                prevPages: {
                    page: offset - limit >= 0 ? offset - limit + 1 : null,
                    url: offset - limit >= 0 ? `/v1/post?page=${offset - limit + 1}&limit=${limit}` : null
                },
            }
        );
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan saat mengambil data', error: err });
    }
};

// Get single Post
exports.getPost = async (response, id) => {
    try {
        const data = await koneksi.post.findUnique({ where: { id: Number(id) } });
        if (data) {
            responseData(response, 200, data);
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Update Post
exports.updatePost = async (response, id, data) => {
    try {
        const item = await koneksi.post.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.post.update({ where: { id: Number(id) }, data });
            responseMessage(response, 200, 'Berhasil update data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Delete Post
exports.deletePost = async (response, id) => {
    try {
        const item = await koneksi.post.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.post.delete({ where: { id: Number(id) } });
            responseMessage(response, 200, 'Berhasil hapus data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};
