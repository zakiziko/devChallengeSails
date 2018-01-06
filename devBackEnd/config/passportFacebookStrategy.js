/**
 * passportFacebookStrategy
 *
 * @description :: Server-side logic for managing facebook authentification 
 * @help        :: See https://www.npmjs.com/package/passport-facebook
 */

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    graph = require('fbgraph');
 
 

passport.serializeUser(function(user, done) {
  done(null, user);
});
  
passport.deserializeUser(function(user, done) {
  done(null, user);
});

var verifyHandler = function(req,accessToken, tokenSecret, profile, done) {
  process.nextTick(function() {
    User.findOne({'userid':profile.id}).exec(function(err,user){
      if(err){
        return done(null);
      }if(user){
        return done(null,user);
      }else{
     
        graph.setAccessToken(accessToken);
        graph.post(profile.id+"/?fields=id,name,email", function(err, res) {
          if(err)
            throw err;
          else{
            let newUser = {
              userid : res.id,
              name : res.name,
              email : res.email
            }
            //save the new user into database
            User.create(newUser).exec(function(err,user){
              if(err){
                return done(null)
              }else{
                return done(null,user);
              }
            })
          }
        });
      }
    })
  });
};
 
passport.use(new FacebookStrategy({
  clientID: '2065785360370348',
  clientSecret : '3c2a5cbc52a418c3e1eba0772ee5d393',
  callbackURL : 'http://localhost:3001/profile',
  passReqToCallback: true
}, verifyHandler));