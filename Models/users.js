import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
    }
  });

  UserSchema.pre(
    'save',
    async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
  );

  UserSchema.method.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt(password, user.password);

    return compare
  }

  const User = mongoose.model('User', UserSchema);

  module.exports = User;