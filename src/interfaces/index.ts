import type { ValidationChain } from 'express-validator';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { Document, Types, QuerySelector } from 'mongoose';

export enum IMongoSortOrder {
  ASC = 1,
  DESC = -1,
}

export type IDictionary<TValue> = Record<string, TValue>;
export type MongoFilterQuery<TValue> = QuerySelector<TValue> | TValue;
export type ExpressValidations = Array<ValidationChain | ValidateFields>;
export type ValidateFields = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Response | undefined;

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  online: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage extends Document {
  from: Types.ObjectId | IUser;
  to: Types.ObjectId | IUser;
  message: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayloadExt extends JwtPayload {
  id?: string;
}
export interface RequestExt extends Request {
  user?: IUser | string;
}

export interface APIError {
  message: string;
  code: number;
  description: string;
}
