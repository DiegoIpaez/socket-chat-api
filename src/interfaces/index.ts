import type { ValidationChain } from 'express-validator';
import type { RequestHandler } from 'express';
import type { QuerySelector } from 'mongoose';

export * from './schemaInterface';

export enum IMongoSortOrder {
  ASC = 1,
  DESC = -1,
}

export type IDictionary<TValue> = Record<string, TValue>;
export type MongoFilterQuery<TValue> = QuerySelector<TValue> | TValue;
export type ExpressValidations = Array<ValidationChain | RequestHandler>;
