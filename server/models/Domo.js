const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ArtistModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    
    age: {
        type: Number,
        min: 0,
        required: true,
    },
    
    level: {
        type: Number,
        min: 0,
        required: true,
    },
    
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    
    createdData: {
        type: Date,
        default: Date.now,
    },
});

ArtistSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    age: doc.age,
    level: doc.level,
});

ArtistSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };
    
    return ArtistModel.find(search).select('name age level').exec(callback);
};

ArtistModel = mongoose.model('Artist', ArtistSchema);

module.exports.ArtistModel = ArtistModel;
module.exports.ArtistSchema = ArtistSchema;