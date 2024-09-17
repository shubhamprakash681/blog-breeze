export type PostFormInputs = {
  title: string;
  slug: string;
  content: string;
  featuredImage: FileList | string;
  status: "active" | "inactive";
  userId: string;
};
