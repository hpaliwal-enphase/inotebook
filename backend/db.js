const mongoose = require('mongoose');
const { mongo_db_user, mongo_db_userpwd } = require('./secrets');

const mongoURI = `mongodb+srv://${mongo_db_user}:${mongo_db_userpwd}@inotebookcluster.gmlgi.mongodb.net/inotebook?retryWrites=true&w=majority`;


const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo successfully!");
    })
}

module.exports = connectToMongo;