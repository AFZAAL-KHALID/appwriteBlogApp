import Conf from "../Conf-env/Conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  account;

  constructor() {
    this.Client.setEndpoint(Conf.appwriteUrl).setProject(
      Conf.appwriteProjectId
    );
    this.account = new Account(this.Client);
  }
  //my functions
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method like login
      } else {
        return userAccount;
        //will see later
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email, password}){
    try {
        await this.account.account.createEmailPasswordSession('email', 'password');
    } catch (error) {
        throw error
    }
  }
}

const authservice = new AuthService();
export default authservice;
