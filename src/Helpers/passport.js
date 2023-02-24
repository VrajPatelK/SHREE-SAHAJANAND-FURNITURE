const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({

    clientID: "521683065040-d5jjl566343duu4m1nr387lvbsuk8a0p.apps.googleusercontent.com", // Your Credentials here.
    clientSecret: "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", // Your Credentials here.
    callbackURL: "http://localhost:8500/auth/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
