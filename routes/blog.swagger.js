/**
 * @swagger
 * paths:
 *  /blog:
 *      get:
 *          tags: [Blog]
 *          summary: Menampilkan semua data blog.
 *          description: Menampilkan semua data blog.
 *          parameters:
 *              -   in: query
 *                  name: limit
 *                  type: integer
 *                  required: false
 *                  description: Untuk menampilkan jumlah data yang diinginkan
 *              -   in: query
 *                  name: page
 *                  type: integer
 *                  required: false
 *                  description: Untuk menampilkan data dalam page yang diinginkan
 *          responses:
 *              '200':
 *                  description: Respon sukses menampilkan data.
 *              '404':
 *                  description: Data blog tidak ditemukan.
 *              '500':
 *                  description: Server tidak merespon.
 *  /blog/{id}:
 *      get:
 *          tags: [Blog]
 *          summary: Menampilkan data blog berdasarkan ID.
 *          description: Menampilkan data blog berdasarkan ID.
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *                  description: ID dari blog yang ingin ditampilkan.
 *          responses:
 *                  '200':
 *                      description: Respon sukses menampilkan data.
 *                  '404':
 *                      description: Data blog tidak ditemukan.
 *                  '500':
 *                      description: Server tidak merespon.
 *      post:
 *          tags: [Blog]
 *          summary: menambahkan data blog.
 *          description: menambahkan data blog.
 *          consumes:
 *              - application/x-www-form-urlencoded
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  description: Judul dari blog.
 *              -   in: formData
 *                  name: description
 *                  type: string
 *                  description: Deskripsi dari blog.
 *              -   in: formData
 *                  name: image
 *                  type: string
 *                  description: Image dari blog.
 *          responses:
 *                  '200':
 *                      description: Respon sukses menambahkan data.
 *                  '404':
 *                      description: Data blog tidak ditemukan.
 *                  '500':
 *                      description: Server tidak merespon.
 *      put:
 *          tags: [Blog]
 *          summary: Mengupdate data blog berdasarkan ID.
 *          description: Mengupdate data blog berdasarkan ID.
 *          consumes:
 *              -   application/x-www-form-urlencoded
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *                  description: ID dari blog yang ingin diupdate
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  description: Judul dari blog.
 *              -   in: formData
 *                  name: description
 *                  type: string
 *                  description: Deskripsi dari blog.
 *              -   in: formData
 *                  name: image
 *                  type: string
 *                  description: Image dari blog.
 *          responses:
 *              '200':
 *                  description: Respon sukses mengupdate data.
 *              '404':
 *                  description: Data blog tidak ditemukan.
 *              '500':
 *                  description: Server tidak merespon.
 *      delete:
 *          tags: [Blog]
 *          summary: Menghapus data blog berdasarkan ID.
 *          description: Menghapus data blog berdasarkan ID.
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: integer
 *                  required: true
 *                  description: ID dari blog yang ingin dihapus.
 *          responses:
 *              '200':
 *                  description: Respon sukses menghapus data.
 *              '404':
 *                  description: Data blog tidak ditemukan.
 *              '500':
 *                  description: Server tidak merespon.
 */
