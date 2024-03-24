import dotenv from 'dotenv';

dotenv.config();

export const getEnv = (env: any): string => {
  if (env) {
    return env;
  }

  return '';
};
