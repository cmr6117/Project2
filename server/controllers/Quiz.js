//const fs = require('fs');
const models = require('../models');
const artists = require('./artists.js');
const Quiz = models.Quiz;

let fileData = artists.Artists;
let songList = [];
for(let i = 0; i < fileData.length; i++){
    for(let j = 0; j < fileData[i].songs.length; j++){
        songList.push({
            songName: fileData[i].songs[j],
            artistIndex: i,
        });
    }
}


const makerPage = (req, res) => {
    Quiz.QuizModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.render('app', { csrfToken: req.csrfToken(), quizzes: docs });
    });
};

const makeQuiz = (req, res) => {
    if (!req.body.quizCorrect || !req.body.quizChoice || !req.body.quizSong){
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    let quizVictory = (req.body.quizCorrect === req.body.quizChoice);
    const quizData = {
        quizCorrect: req.body.quizCorrect,
        quizChoice: req.body.quizChoice,
        quizSong: req.body.quizSong,
        quizWon: quizVictory,
        owner: req.session.account._id,
    }
    
    const newQuiz = new Quiz.QuizModel(quizData);
    
    const quizPromise = newQuiz.save();
  
    quizPromise.then(() => {
      res.json({newQuiz});
    });
    
    quizPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000){
            return res.status(400).json({ error: 'Quiz already exists.' });
        }
        
        return res.status(400).json({ error: 'An error occurred' });
    });    
    
    return quizPromise;
};

const getQuizzes = (request, response) => {
    const req = request;
    const res = response;
    
    return Quiz.QuizModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.json({ quizzes: docs });
    });
};

const getQuizData = (request, response) => {
    const res = response;
    let artistChoice = [...fileData];
    
    let songNum = Math.floor(Math.random()*songList.length);
    let song = songList[songNum].songName;
    let correctArtist = artistChoice.splice(songList[songNum].artistIndex,1)[0].quiz;
    
    let artistsForQuiz = [];
    for(let i = 0; i < 4; i++){
        let artistNum = Math.floor(Math.random()*artistChoice.length);
        let currentArtist = artistChoice.splice(artistNum, 1)[0];
        artistsForQuiz.push(currentArtist.quiz);
    }
    artistsForQuiz.splice(Math.floor(Math.random()*5),0,correctArtist);

    let outputObj = {
        correctArtist,
        song,
        "artistOptions":artistsForQuiz,
    };
    
    return res.json(outputObj);
};

module.exports.makerPage = makerPage;
module.exports.getQuizzes = getQuizzes;
module.exports.getQuizData = getQuizData;
module.exports.make = makeQuiz;