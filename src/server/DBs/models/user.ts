import { Schema, model, models } from 'mongoose';

const usersSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    auth: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', usersSchema);

export default User;
