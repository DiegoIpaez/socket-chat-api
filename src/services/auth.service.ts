import bcrypt from 'bcryptjs';

const encryptPassword = async (passwordPlain: string): Promise<string> => {
  const salt = bcrypt.genSaltSync();
  const hash = await bcrypt.hash(passwordPlain, salt);
  return hash;
};

const comparePasswords = async (
  passwordPlain: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

export { comparePasswords, encryptPassword };
