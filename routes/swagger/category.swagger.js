
/**
 * @swagger
 * paths:
 *  /category:
 *      get:
 *          tags: [Category]
 *          summary: Menampilkan semua data Category.
 *          description: Menampilkan semua data Category.
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
 *          tags: [Category]
 *          summary: Menambahkan data Category.
 *          description: Menambahkan data Category.
 *          parameters:
 *              - in: formData
 *                name: title
 *                type: string
 *                description: Title dari Category.
 *          responses:
 *              '200':
 *                  description: Sukses.
 *  /category/{id}:
 *      get:
 *          tags: [Category]
 *          summary: Menampilkan data Category berdasarkan ID.
 *          description: Menampilkan data Category berdasarkan ID.
 *          parameters:
 *              - in: path
 *                name: id
 *                type: integer
 *                required: true
 *          responses:
 *              '200':
 *                  description: Sukses.
 */
    