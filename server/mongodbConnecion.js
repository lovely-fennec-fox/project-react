const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {

    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

};