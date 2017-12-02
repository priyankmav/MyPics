var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var PhotoSchema = new Schema({
    galleryId: { type: Schema.Types.ObjectId, required: true },
    file: {filename: String, originalName: String, dateUploaded: Date },
    description: { type: String },
    dateCreated: {type: Date, default: Date.now},
    }
);

module.exports = Mongoose.model('Photo', PhotoSchema);