import { Schema, model, models } from 'mongoose';

const modeSchema = new Schema({
  slug: String,
  title: String,
  description: String,
  number_questions: Number,
  price: Number,
  is_certificate: Boolean,
  is_explanation: Boolean,
  is_practical_application: Boolean,
  is_recommendation: Boolean,
  isEnable: Boolean,
});

const Mode = models.Mode || model('Mode', modeSchema);

export default Mode;
