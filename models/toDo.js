import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  complete: {
    type: Number,
    require: true,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
