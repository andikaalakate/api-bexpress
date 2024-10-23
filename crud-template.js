const fs = require('fs');
const path = require('path');

// Fungsi untuk membuat file dengan template
function createFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error creating file at ${filePath}:`, err);
        } else {
            console.log(`File created at: ${filePath}`);
        }
    });
}

// Fungsi untuk membuat controller
function createController(name) {
    const controllerTemplate = `
const { 
    insert${name}, 
    get${name}s, 
    get${name}, 
    update${name}, 
    delete${name} 
} = require('../models/${name}');

// create ${name}
exports.createData = (req, res) => {
    const data = { ...req.body };
    insert${name}(res, data);
};

exports.readDatas = (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let offset = (page - 1) * limit;
    get${name}s(res, limit, offset);
};

exports.readData = (req, res) => {
    get${name}(res, req.params.id);
};

exports.updateData = (req, res) => {
    const data = { ...req.body };
    update${name}(res, req.params.id, data);
};

exports.deleteData = (req, res) => {
    delete${name}(res, req.params.id);
};
    `;
    createFile(path.join(__dirname, `controllers/${name}.js`), controllerTemplate);
}

// Fungsi untuk membuat model
function createModel(name) {
    const modelTemplate = `
const koneksi = require('../config/database');
const { responseData, responseMessage } = require('../utils/response-handler');

// Insert ${name}
exports.insert${name} = async (response, data) => {
    try {
        await koneksi.${name.toLowerCase()}.create({ data });
        responseMessage(response, 201, 'Berhasil insert data!');
    } catch (err) {
        response.status(500).json({ message: 'Gagal insert data!', error: err });
    }
};

// Get ${name}s with pagination
exports.get${name}s = async (response, limit, offset) => {
    try {
        // Count total data for pagination
        const totalData = await koneksi.${name.toLowerCase()}.count();
        
        // Fetch the paginated data
        const ${name.toLowerCase()}s = await koneksi.${name.toLowerCase()}.findMany({
            skip: offset, 
            take: limit
        });
        
        // Calculate total number of pages
        const totalPages = Math.ceil(totalData / limit);

        // Build response data
        const paginationInfo = {
            dataPerPage: limit,
            totalData,
            totalPages
        };

        const currentPage = offset / limit + 1;
        const nextPage = offset + limit < totalData ? currentPage + 1 : null;
        const prevPage = offset - limit >= 0 ? currentPage - 1 : null;

        const nextUrl = nextPage ? "/v1/blog?page=" + nextPage + "&limit=" + limit : null;
        const prevUrl = prevPage ? "/v1/blog?page=" + prevPage + "&limit=" + limit : null;

        responseData(response, 200, ${name.toLowerCase()}s, paginationInfo, {
            currentPage,
            nextPages: {
                page: nextPage,
                url: nextUrl
            },
            prevPages: {
                page: prevPage,
                url: prevUrl
            }
        });
    } catch (err) {
        // Error handling
        response.status(500).json({
            message: 'Ada kesalahan saat mengambil data',
            error: err.message
        });
    }
};

// Get single ${name}
exports.get${name} = async (response, id) => {
    try {
        const data = await koneksi.${name.toLowerCase()}.findUnique({ where: { id: Number(id) } });
        if (data) {
            responseData(response, 200, data);
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Update ${name}
exports.update${name} = async (response, id, data) => {
    try {
        const item = await koneksi.${name.toLowerCase()}.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.${name.toLowerCase()}.update({ where: { id: Number(id) }, data });
            responseMessage(response, 200, 'Berhasil update data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};

// Delete ${name}
exports.delete${name} = async (response, id) => {
    try {
        const item = await koneksi.${name.toLowerCase()}.findUnique({ where: { id: Number(id) } });
        if (item) {
            await koneksi.${name.toLowerCase()}.delete({ where: { id: Number(id) } });
            responseMessage(response, 200, 'Berhasil hapus data!');
        } else {
            response.status(404).json({ message: 'Data tidak ditemukan!', success: false });
        }
    } catch (err) {
        response.status(500).json({ message: 'Ada kesalahan', error: err });
    }
};
    `;
    createFile(path.join(__dirname, `models/${name}.js`), modelTemplate);
}

// Fungsi untuk membuat routes
function createRoutes(name) {
    const routeTemplate = `
const { 
    createData, 
    readDatas, 
    readData, 
    updateData, 
    deleteData 
} = require('../controllers/${name}');

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
    `;
    createFile(path.join(__dirname, `routes/${name}.js`), routeTemplate);
}

// Fungsi untuk membuat swagger
function createSwagger(name) {
    const swaggerTemplate = `
/**
 * @swagger
 * paths:
 *  /${name.toLowerCase()}:
 *      get:
 *          tags: [${name}]
 *          summary: Menampilkan semua data ${name}.
 *          description: Menampilkan semua data ${name}.
 *          parameters:
 *              - in: query
 *                name: limit
 *                type: integer
 *                description: Limit data.
 *              - in: query
 *                name: page
 *                type: integer
 *                description: Halaman data.
 *          responses:
 *              '200':
 *                  description: Sukses.
 *      post:
 *          tags: [${name}]
 *          summary: Menambahkan data ${name}.
 *          description: Menambahkan data ${name}.
 *          parameters:
 *              - in: formData
 *                name: title
 *                type: string
 *                description: Title dari ${name}.
 *          responses:
 *              '200':
 *                  description: Sukses.
 *  /${name.toLowerCase()}/{id}:
 *      get:
 *          tags: [${name}]
 *          summary: Menampilkan data ${name} berdasarkan ID.
 *          description: Menampilkan data ${name} berdasarkan ID.
 *          parameters:
 *              - in: path
 *                name: id
 *                type: integer
 *                required: true
 *          responses:
 *              '200':
 *                  description: Sukses.
 */
    `;
    createFile(path.join(__dirname, `routes/${name.toLowerCase()}.swagger.js`), swaggerTemplate);
}

// Fungsi utama untuk membuat semua file
function createCRUD(name) {
    createController(name);
    createModel(name);
    createRoutes(name);
    createSwagger(name);
}

// Input nama untuk file yang akan dibuat
const inputName = process.argv[2]; // Ambil dari argument CLI
if (inputName) {
    createCRUD(inputName);
} else {
    console.log('Harap masukkan nama entity.');
}
