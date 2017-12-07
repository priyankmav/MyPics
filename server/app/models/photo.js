var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var PhotoSchema = new Schema({
    galleryId: {type: Schema.Types.ObjectId, required: true},
    photoName: {type:String},
    photoDes: {type:String},
    file: {filename: String, originalName: String, dateUploaded: Date },
    dateUploaded: {type: Date, default: Date.now},
    }
);

module.exports = Mongoose.model('Photo', PhotoSchema);