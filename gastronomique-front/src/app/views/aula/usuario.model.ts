export class Usuario {
    id?: String;
    email!: String;
    fullName!: String;
    isActive!: String;
    password!: String;
    username!: String;
    roles!: { id?: number; name: string }[];
  }
