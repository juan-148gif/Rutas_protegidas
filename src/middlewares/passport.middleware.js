const passport = requeire('passport')

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const {findUserById} = require('../users/users.controllers')

const options = {
    jwrFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken() ,
    secretOrkey: 'Ac4d3ml0vers'
}

passport.use(new JwtStrategy(options, (tokenDecoded, done) => {
   
    findUserById(tokenDecoded.id)
     .then(user => {
        if(user){
            done(null, user)
        }else{
            done(null, false)
        }
     })
     .catch(err => {
        done(err, false)
     })
}))