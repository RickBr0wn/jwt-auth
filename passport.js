const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const User = require('./models/User')

const cookieExtractor = req => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['access_token']
  }
  return token
}

// protecting end-points
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'rick_brown',
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    }
  )
)

// authentication { username, password }
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      // error with database
      if (err) {
        return done(err)
      }
      // user does not exist in database
      if (!user) {
        return done(null, false)
      }
      // check password with database stored password
      user.comparePassword(password, done)
    })
  })
)
