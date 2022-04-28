import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../types/user.interface';

export const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  words: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre<User>('save', function (next) {
  let user = this;
  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) return next();

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function (attempt, callback) {
  let user = this;
  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
