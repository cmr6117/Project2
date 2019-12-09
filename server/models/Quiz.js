const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let QuizModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const QuizSchema = new mongoose.Schema({
    quizCorrect: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    
    quizChoice: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    
    quizSong: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    
    quizWon: {
        type: Boolean,
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

QuizSchema.statics.toAPI = (doc) => ({
    quizCorrect: doc.quizCorrect,
    quizChoice: doc.quizChoice,
    quizSong: doc.quizSong,
    quizWon: doc.quizWon,
});

QuizSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };
    
    return QuizModel.find(search).select('quizCorrect quizChoice quizSong quizWon').exec(callback);
};

QuizModel = mongoose.model('Quiz', QuizSchema);

module.exports.QuizModel = QuizModel;
module.exports.QuizSchema = QuizSchema;