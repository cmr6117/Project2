const controllers = require('./controllers');
const mid = require('./middleware')

const router = (app) => {
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.get('/getQuizzes', mid.requiresLogin, controllers.Quiz.getQuizzes);
    app.get('/getQuizData', mid.requiresLogin, controllers.Quiz.getQuizData);
    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    app.post('/changePass', mid.requiresSecure, controllers.Account.changePass);
    app.get('/about', mid.requiresSecure, controllers.Account.about);
    app.get('/maker', mid.requiresLogin, controllers.Quiz.makerPage);
    app.post('/maker', mid.requiresLogin, controllers.Quiz.make);
    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;