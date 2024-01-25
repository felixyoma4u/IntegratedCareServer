import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from "../Models/users";

const JWT_OPTIONS = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
  };

  passport.use(new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: 'Invalid credentials' });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use(new JwtStrategy(JWT_OPTIONS, (jwtPayload, done) => {
    User.findOne({ email: jwtPayload.email }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));