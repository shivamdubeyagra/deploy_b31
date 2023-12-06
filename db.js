const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();
const Connection = mongoose.connect(process.env.mongoURL)

module.exports = {Connection}