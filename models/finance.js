import mongoose from 'mongoose';

const FinanceSchema = new mongoose.Schema({
  expenses: {
    fixedExpenses: {
      type: Number,
      required: true,
      default: 0,
    },
    entertainment: {
      type: Number,
      required: true,
      default: 0,
    },
    discretionarySpending: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  income: {
    type: Number,
    require: true,
  },
  saving: {
    type: Number,
    require: true,
  },
  persons: {
    type: Number,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
});

const Finance = mongoose.model('Finance', FinanceSchema);

export { FinanceSchema };
export default Finance;
