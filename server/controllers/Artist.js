const fs = require('fs');
const models = require('../models');
const Artist = models.Artist;

let fileData = require('./artists.json');

/*
let questionData = {
  possibleAnswers: ['a-ha', 'weird al', 'led zeppelin'],
  actualAnswer: 'pink floyd',
  song: 'Dogs'
};
*/


const makerPage = (req, res) => {
    Artist.ArtistModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.render('app', { csrfToken: req.csrfToken(), artists: docs });
    });
};

const makeArtist = (req, res) => {
    if (!req.body.name || !req.body.age || !req.body.level){
        return res.status(400).json({ error: 'RAWR! Both name, age, and level are required' });
    }
    
    const artistData = {
        name: req.body.name,
        age: req.body.age,
        level: req.body.level,
        owner: req.session.account._id,
    }
    
    const newArtist = new Artist.ArtistModel(artistData);
    
    const artistPromise = newArtist.save();
  
    artistPromise.then(() => {
      res.json({newArtist});
    });
    
    artistPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000){
            return res.status(400).json({ error: 'Artist already exists.' });
        }
        
        return res.status(400).json({ error: 'An error occurred' });
    });    
    
    return artistPromise;
};

const getArtists = (request, response) => {
    const req = request;
    const res = response;
    
    return Artist.ArtistModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.json({ artists: docs });
    });
};

module.exports.makerPage = makerPage;
module.exports.getArtists = getArtists;
module.exports.make = makeArtist;