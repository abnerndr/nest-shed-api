type Role = 'admin' | 'user' | 'managment';

type Permission = {
  type: string;
  read: boolean;
  create: boolean;
  delete: boolean;
  update: boolean;
};

export { Role, Permission };

// address

type AddressProps = {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

export { AddressProps }
