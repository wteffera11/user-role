export interface Role {
  id: string;
  name: string;
  description: string;
  children: Children[];
}

export interface Children {
  id: string;
  name: string;
  description: string;
}
