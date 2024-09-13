export interface IPosts {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: boolean;
  userId: string;
}

export interface IUser {
  $id: string
}
