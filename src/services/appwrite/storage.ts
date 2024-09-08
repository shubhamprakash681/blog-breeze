import { Client, ID, Storage } from "appwrite";
import { envVariables } from "../../config/variables";

class StorageService {
  client: Client = new Client();
  storage: Storage;

  constructor() {
    this.client
      .setEndpoint(envVariables.appwriteUrl)
      .setProject(envVariables.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file: File) {
    try {
      return await this.storage.createFile(
        envVariables.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite storage service Error: ", error);

      return false;
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.storage.deleteFile(envVariables.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite storage service Error: ", error);

      return false;
    }
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview(envVariables.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();
export default storageService;
