import { IPost } from "./collections";

export type PostFormInputs = {
  title: IPost["title"];
  slug: IPost["slug"];
  content: IPost["content"];
  featuredImage: FileList | string;
  category: IPost["category"];
  status: IPost["status"];
  userId: IPost["userId"];
};

export type NavItems = {
  name: string;
  slug: string;
  active: boolean;
  buttonVariant:
    | "primary"
    | "secondary"
    | "outlined"
    | "destructive"
    | "ghost"
    | "link";
};
