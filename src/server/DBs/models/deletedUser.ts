import { Schema, model, models } from 'mongoose';

const deletedUsersSchema = new Schema(
  {
    email_hash: {
      type: String,
      required: true,
      unique: true,
    },
    used_modes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Mode',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DeletedUser = models.DeletedUser || model('DeletedUser', deletedUsersSchema);

export default DeletedUser;
