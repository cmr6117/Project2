const controllers = require('./controllers');
const mid = require('./middleware')

const router = (app) => {
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.get('/getArtists', mid.requiresLogin, controllers.Artist.getArtists);
    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    app.post('/changePass', mid.requiresLogin, controllers.Account.changePass);
    app.get('/about', mid.requiresSecure, controllers.Account.about);
    app.get('/maker', mid.requiresLogin, controllers.Artist.makerPage);
    app.post('/maker', mid.requiresLogin, controllers.Artist.make);
    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;