export interface IPosts {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
  status: "active" | "inactive";
  userId: string;
}

export interface IUser {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  accessedAt: string;
  email: string;
  emailVerification: boolean;
  labels: [];
  mfa: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  registration: string;
  status: boolean;
}
