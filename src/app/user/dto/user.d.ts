export type UserPermissionsProps = 'admin' | 'user' | 'managment';

export type UserRolesProps = {
    type: string | null;
    read: boolean | null;
    create: boolean | null;
    delete: boolean | null;
    update: boolean | null;
};

