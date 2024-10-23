
const koneksi = require('../config/database');
const { responseData, responseMessage } = require('../utils/response-handler');

// Insert Category
exports.insertCategory = async (response, data) => {
    try {
        await koneksi.category.create({ data });
        responseMessage(response, 201, 'Berhasil insert data!');
    } catch (err) {
        response.status(500).json({ message: 'Gagal insert data!', error: err });
    }
};

// Get Categorys with pagination
exports.getCategorys = async (response, limit, offset) => {
    try {
        const totalData = await koneksi.category.count();
        const categorys = await koneksi.category.findMany({ skip: offset, take: limit });
        const totalPages = Math.ceil(totalData / limit);
        responseData(response, 200, categorys,
            {
                dataPerPage: limit,
                totalData,
                totalPages
            },
            {
                currentPage: offset / limit + 1,
                nextPages: {
                    page: offset + limit < totalData ? offset + limit + 1 : null,
                    url: offset + limit < totalData ? `/v1/category?page=${offset + limit + 1}&limit=${limit}` : null
                },
                prevPages: {
                    page: offset - limit >= 0 ? offset - limit + 1 : null,
                    url: offset - limit >= 0 ? `/v1/category?page=${offset - limit + 1}&limit=${limit}` : null
                },
            }
        );
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan saat mengambil data', error: err });
    }
};

// Get single Category
exports.getCategory = async (response, id) => {
    try {
        const data = await koneksi.category.findUnique({ where: { id: Number(id) } });
        if (data) {
            responseData(response, 200, data);
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Update Category
exports.updateCategory = async (response, id, data) => {
    try {
        const item = await koneksi.category.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.category.update({ where: { id: Number(id) }, data });
            responseMessage(response, 200, 'Berhasil update data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Delete Category
exports.deleteCategory = async (response, id) => {
    try {
        const item = await koneksi.category.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.category.delete({ where: { id: Number(id) } });
            responseMessage(response, 200, 'Berhasil hapus data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};
