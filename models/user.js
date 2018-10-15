'use estrict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    phone: Number,
    description: String
})

module.exports = mongoose.model('User', UserSchema)