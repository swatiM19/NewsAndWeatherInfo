const express = require('express');
const router = express.Router();
const authCtrl = require('./controllers/Auth');
const { ensureAuthentic } = require('./controllers/AuthUtils');


// ##########################  Authentication  ####################################
router.post('/login/', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/logout/', ensureAuthentic, authCtrl.logout);

// ##########################  News + Weather  ####################################
router.use('/news', ensureAuthentic, require('./routes/news'));

module.exports = router;