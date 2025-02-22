const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_USERPWD}@inotebookcluster.gmlgi.mongodb.net/inotebook?retryWrites=true&w=majority`;


const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo successfully!");
    })
}

module.exports = connectToMongo;