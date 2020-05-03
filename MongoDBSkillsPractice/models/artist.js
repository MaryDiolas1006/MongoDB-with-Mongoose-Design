const mongoose = require('mongoose');
const AlbumSchema = require('./ablum');
const Schema = mongoose.Schema;


const ArtistSchema = new Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    website: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    album: [AlbumSchema]
});


const Artist = mongoose.model('artist', ArtistSchema);
module.exports = Artist;
