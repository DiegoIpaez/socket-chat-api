import { usersData } from './user.mock';

const [userA, userB] = usersData;

export const messageData = [
  {
    from: userA._id,
    to: userB._id,
    message: 'Hello',
  },
  {
    from: userB._id,
    to: userA._id,
    message: 'Hello dude',
  },
];
