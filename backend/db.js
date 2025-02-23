const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USERPWD}@inotebookcluster.gmlgi.mongodb.net/inotebook?retryWrites=true&w=majority`;
console.log(mongoURI);

const connectToMongo = async() => {
    await mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo successfully!");
    })
}

module.exports = connectToMongo;