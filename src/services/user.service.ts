import type { IMongoSortOrder, MongoFilterQuery } from '../interfaces';
import { MONGO_SORT_ORDER } from '../constants';
import User from '../model/user.model';

interface FilterToGetUsers {
  limit: number;
  init: number;
  sort?: Record<string, IMongoSortOrder>;
  select?: string;
  deleted?: MongoFilterQuery<boolean>;
  online?: MongoFilterQuery<boolean>;
  _id?: MongoFilterQuery<string>;
}

const getAllUsersByFilters = async ({
  limit,
  init,
  select = '',
  sort = { createdAt: MONGO_SORT_ORDER.ASC },
  ...rest
}: FilterToGetUsers) => {
  const [total, users] = await Promise.all([
    User.countDocuments({ ...rest }),
    User.find({ ...rest })
      .skip(Number(init))
      .limit(Number(limit))
      .sort(sort)
      .select(select),
  ]);
  return { total, users };
};

export { getAllUsersByFilters };
