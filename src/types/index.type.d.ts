export type PostFormInputs = {
  title: string;
  slug: string;
  content: string;
  featuredImage: FileList | string;
  status: "active" | "inactive";
  userId: string;
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
