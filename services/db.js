const mongoose = require('mongoose');
const config = require('./keys');

const connectDb = () => {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER || config.MONGODB_USER}:${process.env.MONGODB_PASS || config.MONGODB_PASS}@cluster0.or1bs.mongodb.net/${process.env.MONGODB_DB || config.MONGODB_DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database has been penetrated!');
    }).catch(() => {
        console.log('Error connecting to DB!');
    });
}

module.exports = connectDb;