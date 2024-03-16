import { Schema, model, Types } from 'mongoose';
import type { IMessage } from '../interfaces';

const MessageSchema = new Schema<IMessage>(
  {
    from: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Message', MessageSchema);
