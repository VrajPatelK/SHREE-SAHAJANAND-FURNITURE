const express = require('express');
const router = express.Router();

const passport = require("passport");
const cookieSession = require("cookie-session");
require("../Helpers/google-passport");

const {
    googleSuccessAuth,
    googleFailAuth

} = require("../../controllers/google-auth-cntrl");

//1.)
router.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));

//2.)
router.use(passport.initialize());
router.use(passport.session());

// 3. auth
router.get('/auth',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }));

//.4 auth callback - redirect link
router.get('/auth/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
    }));

//.5 success
router.get('/auth/callback/success', googleSuccessAuth);

//.6 failure
router.get('/auth/callback/failure', googleFailAuth);



module.exports = router;