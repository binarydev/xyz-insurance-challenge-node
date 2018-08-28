var env_vars = process.env;
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDBUri = `mongodb://${env_vars.MONGO_HOST || 'localhost'}:${env_vars.MONGO_PORT || '27017'}/${env_vars.MONGO_DB_NAME || 'xavier'}`;
mongoose.connect(mongoDBUri, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;