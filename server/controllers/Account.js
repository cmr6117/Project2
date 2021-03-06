const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', {
    csrfToken: req.csrfToken()
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const about = (req, res) => {
  res.render('about', {
    csrfToken: req.csrfToken()
  });
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({
      error: 'All fields are required'
    });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({
        error: 'Wrong username or password'
      });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({
      redirect: '/maker'
    });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({
      error: 'All fields are required'
    });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({
      error: 'Passwords do not match'
    });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return res.json({
        redirect: '/maker'
      });
    })

    savePromise.catch((err) => {
        console.log(err);

        if (err.code === 11000) {
            return res.status(400).json({
                error: 'Username already in use.'
            });
        }

        return res.status(400).json({
            error: 'An error ocurred'
        });
    });
  });
};


const changePass = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;
  req.body.oldPass = `${req.body.oldPass}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2 || !req.body.oldPass) {
    return res.status(400).json({
      error: 'All fields are required'
    });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({
      error: 'Passwords do not match'
    });
  }

  console.dir(req.body);
  return Account.AccountModel.authenticate(
    req.body.username, req.body.oldPass, (err, account) => {
      console.dir(account);
    if (err || !account) {
      return res.status(401).json({
        error: 'Wrong username or password'
      });
    }

    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
      let updateAccount = account;

      updateAccount.salt = salt;
      updateAccount.password = hash;

      const savePromise = updateAccount.save();

      savePromise.then(() => {
        req.session.account = Account.AccountModel.toAPI(updateAccount);
        return res.json({
          redirect: '/maker'
        });
      });

      savePromise.catch((error) => {
        console.dir(error);
      });
      return;
    });
  });

};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.changePass = changePass;
module.exports.about = about;
module.exports.signup = signup;
module.exports.getToken = getToken;
