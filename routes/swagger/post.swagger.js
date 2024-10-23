
/**
 * @swagger
 * paths:
 *  /post:
 *      get:
 *          tags: [Post]
 *          summary: Menampilkan semua data Post.
 *          description: Menampilkan semua data Post.
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
 *          tags: [Post]
 *          summary: Menambahkan data Post.
 *          description: Menambahkan data Post.
 *          parameters:
 *              - in: formData
 *                name: title
 *                type: string
 *                description: Title dari Post.
 *          responses:
 *              '200':
 *                  description: Sukses.
 *  /post/{id}:
 *      get:
 *          tags: [Post]
 *          summary: Menampilkan data Post berdasarkan ID.
 *          description: Menampilkan data Post berdasarkan ID.
 *          parameters:
 *              - in: path
 *                name: id
 *                type: integer
 *                required: true
 *          responses:
 *              '200':
 *                  description: Sukses.
 */
    