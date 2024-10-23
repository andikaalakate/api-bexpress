const koneksi = require('../config/database');
const { responseData, responseMessage } = require('../utils/response-handler');

// Insert Blog
exports.insertBlog = async (response, data) => {
    try {
        await koneksi.blog.create({
            data: data
        });
        responseMessage(response, 201, 'Berhasil insert data!');
    } catch (err) {
        response.status(500).json({ message: 'Gagal insert data!', error: err });
    }
};

// Get Blogs with pagination
exports.getBlogs = async (response, limit, offset) => {
    try {
        const totalData = await koneksi.blog.count();
        const blogs = await koneksi.blog.findMany({
            skip: Number(offset),
            take: Number(limit),
        });

        const totalPages = Math.ceil(totalData / limit);
        responseData(response, 200, blogs,
            {
                dataPerPage: limit,
                totalData,
                totalPages
            },
            {
                currentPage: offset / limit + 1,
                nextPages: {
                    page: offset + limit < totalData ? offset + limit + 1 : null,
                    url: offset + limit < totalData ? `/v1/blog?page=${offset + limit + 1}&limit=${limit}` : null
                },
                prevPages: {
                    page: offset - limit >= 0 ? offset - limit + 1 : null,
                    url: offset - limit >= 0 ? `/v1/blog?page=${offset - limit + 1}&limit=${limit}` : null
                },
            }
        );
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan saat mengambil data', error: err });
    }
};

// Get a single Blog by ID
exports.getBlog = async (response, id) => {
    try {
        const blog = await koneksi.blog.findUnique({
            where: { id: Number(id) }
        });

        if (blog) {
            responseData(response, 200, blog);
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Update Blog
exports.updateBlog = async (response, id, data) => {
    try {
        const blog = await koneksi.blog.findUnique({
            where: { id: Number(id) }
        });

        if (blog) {
            await koneksi.blog.update({
                where: { id: Number(id) },
                data: data
            });
            responseMessage(response, 200, 'Berhasil update data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Delete Blog
exports.deleteBlog = async (response, id) => {
    try {
        const blog = await koneksi.blog.findUnique({
            where: { id: Number(id) }
        });

        if (blog) {
            await koneksi.blog.delete({
                where: { id: Number(id) }
            });
            responseMessage(response, 200, 'Berhasil hapus data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};