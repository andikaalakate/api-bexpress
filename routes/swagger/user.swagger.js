
/**
 * @swagger
 * paths:
 *  /user:
 *      get:
 *          tags: [User]
 *          summary: Menampilkan semua data User.
 *          description: Menampilkan semua data User.
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
 *          tags: [User]
 *          summary: Menambahkan data User.
 *          description: Menambahkan data User.
 *          parameters:
 *              - in: formData
 *                name: title
 *                type: string
 *                description: Title dari User.
 *          responses:
 *              '200':
 *                  description: Sukses.
 *  /user/{id}:
 *      get:
 *          tags: [User]
 *          summary: Menampilkan data User berdasarkan ID.
 *          description: Menampilkan data User berdasarkan ID.
 *          parameters:
 *              - in: path
 *                name: id
 *                type: integer
 *                required: true
 *          responses:
 *              '200':
 *                  description: Sukses.
 */
    