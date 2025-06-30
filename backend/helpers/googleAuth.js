const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

console.log("Callback URL:", process.env.BASE_URL + "/auth/google/callback");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const googleId = profile.id;

      let user = await User.findOne({ email });

      if (user) {
  
        if (!user.googleId) {
          return done(null, false, {
            message:
              "An account with this email already exists. Please log in with email and password.",
          });
        }
      } else {
 
        user = await User.create({
          name: profile.displayName,
          email,
          googleId,
          verify: true,
          verificationToken: null,
        });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) =>
  User.findById(id).then((user) => done(null, user))
);
