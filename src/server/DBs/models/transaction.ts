import { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema(
  {
    client_secret: {
      type: String,
      required: true,
    },
    payment_transaction_id: {
      type: String,
      required: true,
    },
    payment_system: {
      type: String,
      required: true,
    },
    payment_amount: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    mode: {
      type: Schema.Types.ObjectId,
      ref: 'Mode',
      required: true,
    },
    mode_status: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = models.Transaction || model('Transaction', transactionSchema);

export default Transaction;
