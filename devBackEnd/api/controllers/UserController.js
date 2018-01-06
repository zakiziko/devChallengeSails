

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const passport = require('passport');

module.exports = {
    find: function(req, res, next) {
        passport.authenticate('facebook', { scope: ['email']})(req, res, next);
    },
   
    auth: function(req, res, next) {
      passport.authenticate('facebook', function(err, user) {
        res.json({"user":user});
      })(req, res, next);
    },
};

