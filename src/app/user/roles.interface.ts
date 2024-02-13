type Role = 'admin' | 'user' | 'managment';

type Permission = {
  type: string;
  read: boolean;
  create: boolean;
  delete: boolean;
  update: boolean;
};

export { Role, Permission };
