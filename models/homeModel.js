import mongoose from 'mongoose';

const TodosSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const AreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [TodosSchema],
});

const HomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  areas: [AreaSchema],
  created: {
    type: Date,
    default: Date.now(),
  },
});
HomeSchema.index({ dishName: 'text' });
const Home = mongoose.model('Home', HomeSchema);

export default Home;
