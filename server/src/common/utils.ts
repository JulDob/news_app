import bcrypt from 'bcryptjs';
import config from '../config';

export const generatePassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(config.salt));
  const hasedPasswors = await bcrypt.hash(password, salt);
  return hasedPasswors;
};
