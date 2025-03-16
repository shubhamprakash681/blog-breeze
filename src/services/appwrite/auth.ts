import { Client, Account, ID } from "appwrite";
import { envVariables } from "../../config/variables";

class AuthService {
  client: Client = new Client();
  account: Account;

  constructor() {
    this.client
      .setEndpoint(envVariables.appwriteUrl)
      .setProject(envVariables.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount(email: string, password: string, name: string) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call login
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async createPasswordRecovery(email: string) {
    try {
      const redirectLink = `${window.location.origin}/password/reset`;

      await this.account.createRecovery(email, redirectLink);
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(userId: string, secret: string, password: string) {
    try {
      await this.account.updateRecovery(userId, secret, password);
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
