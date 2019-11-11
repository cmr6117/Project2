const models = require('../models');
const Music = models.Music;

const makerPage = (req, res) => {
    Music.MusicModel.findByOwner(req.session.account._id, (err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred' });
        }
        
        return res.render('app', { csrfToken: req.csrfToken(), musics: docs });
    });
};

const makeMusic = (req, res) => {
    if (!req.body.name || !req.body.age){
        return res.status(400).json({ error: 'No, no, no!  Both name and age are required' });
    }
    
    const musicData = {
        name: req.body.name,
        age: req.body.age,
        owner: req.session.account._id,
    }
    
    const newMusic = new Music.MusicModel(musicData);
    
    const musicPromise = newMusic.save();
    
    musicPromise.catch((err) => {
        console.log(err);
        if (err.code === 11000){
            return res.status(400).json({ error: 'Music already exists.' });
        }
        
        return res.status(400).json({ error: 'An error occurred' });
    });    
    
    return musicPromise;
};

module.exports.makerPage = makerPage;
module.exports.make = makeMusic;