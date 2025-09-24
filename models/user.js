import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN '],
    default: 'user',
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', UsersSchema);
export default User;
