import * as bcrypt from 'bcryptjs';

export const createPass = async (document: string) => {
  let passKey: string;
  passKey = await bcrypt.hash(document, 10);
  passKey = passKey.replace(/[^\w\d\s]/gi, '');
  return passKey;
};
