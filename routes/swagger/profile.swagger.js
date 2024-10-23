
/**
 * @swagger
 * paths:
 *  /profile:
 *      get:
 *          tags: [Profile]
 *          summary: Menampilkan semua data Profile.
 *          description: Menampilkan semua data Profile.
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
 *          tags: [Profile]
 *          summary: Menambahkan data Profile.
 *          description: Menambahkan data Profile.
 *          parameters:
 *              - in: formData
 *                name: title
 *                type: string
 *                description: Title dari Profile.
 *          responses:
 *              '200':
 *                  description: Sukses.
 *  /profile/{id}:
 *      get:
 *          tags: [Profile]
 *          summary: Menampilkan data Profile berdasarkan ID.
 *          description: Menampilkan data Profile berdasarkan ID.
 *          parameters:
 *              - in: path
 *                name: id
 *                type: integer
 *                required: true
 *          responses:
 *              '200':
 *                  description: Sukses.
 */
    