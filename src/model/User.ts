import { Schema, model } from 'mongoose';
import type { User } from '../interfaces';

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniquie: true,
    },
    password: {
      type: String,
      required: true,
    },
    online: {
      type: Boolean,
      default: false,
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

UserSchema.method('toJSON', function () {
  const { _id, password, ...restData } = this.toObject();
  restData.uid = _id;
  return restData;
});

export default model('User', UserSchema);
