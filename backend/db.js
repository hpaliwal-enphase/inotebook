const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://hitanshpaliwal:lAX5YKHjoAhyYfiL@cluster0.ixqkjeu.mongodb.net/inotebook?retryWrites=true&w=majority";

// const mongoURI2 = "mongodb+srv://hitanshpaliwal:lAX5YKHjoAhyYfiL@cluster0.ixqkjeu.mongodb.net/test"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo successfully!");
    })
}

module.exports = connectToMongo;