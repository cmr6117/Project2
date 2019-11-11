const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let MusicModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const MusicSchema = new mongoose.Schema({
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

MusicSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    age: doc.age,
});

MusicSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };
    
    return MusicModel.find(search).select('name age').exec(callback);
};

MusicModel = mongoose.model('Music', MusicSchema);

module.exports.MusicModel = MusicModel;
module.exports.MusicSchema = MusicSchema;