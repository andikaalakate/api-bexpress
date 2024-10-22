const { PrismaClient } = require('@prisma/client')
const koneksi = new PrismaClient()

module.exports = koneksi;