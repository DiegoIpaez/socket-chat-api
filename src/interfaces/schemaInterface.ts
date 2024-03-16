import type { Document, Types } from 'mongoose';

interface SoftDeletable {
  deleted: boolean;
}

interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface CommonPropsModel extends Timestamps, SoftDeletable {}

export interface IUser extends Document, CommonPropsModel {
  username: string;
  email: string;
  password: string;
  online: boolean;
  uid?: string;
}

export interface IMessage extends Document, CommonPropsModel {
  from: Types.ObjectId | IUser;
  to: Types.ObjectId | IUser;
  message: string;
}
