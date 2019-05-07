const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
import models from "../models";

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {
  //jwt_payload is an object literal containing the decoded JWT payload.
  //done is a passport error first callback accepting arguments done(error, user, info)
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      models.employee
        .findOne({ where: { Phone: jwt_payload.Phone } })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
