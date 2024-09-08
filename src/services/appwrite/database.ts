import { Client, Databases, Query } from "appwrite";
import { envVariables } from "../../config/variables";
import { IPosts } from "../../types/collections";

class DatabaseService {
  client: Client = new Client();
  databases: Databases;

  constructor() {
    this.client
      .setEndpoint(envVariables.appwriteUrl)
      .setProject(envVariables.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createPost(post: IPosts) {
    try {
      return await this.databases.createDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        post.slug,
        post
      );
    } catch (error) {
      console.log("Appwrite service Error: ", error);
    }
  }

  async updatePostById(id: string, post: IPosts) {
    try {
      return await this.databases.updateDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        id,
        post
      );
    } catch (error) {
      console.log("Appwrite service Error: ", error);
    }
  }

  async deletePostById(id: string) {
    try {
      await this.databases.deleteDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        id
      );

      return true;
    } catch (error) {
      console.log("Appwrite service Error: ", error);

      return false;
    }
  }

  async getPostById(id: string) {
    try {
      return await this.databases.getDocument(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service Error: ", error);

      return false;
    }
  }

  async getAllPosts(queries: string[] = [Query.equal("status", true)]) {
    try {
      return await this.databases.listDocuments(
        envVariables.appwriteDatabaseId,
        envVariables.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service Error: ", error);

      return false;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
