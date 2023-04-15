import type { ValidationChain } from 'express-validator';
import type { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import type { Document } from 'mongoose';

export type ValidateFields = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Response | undefined;
export type ExpressValidations = Array<ValidationChain | ValidateFields>;
export type IDictionary<TValue> = Record<string, TValue>;

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  online: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayloadExt extends JwtPayload {
  id?: string;
}
export interface RequestExt extends Request {
  user?: User | string;
}

export interface APIError {
  message: string;
  code: number;
  description: string;
}
