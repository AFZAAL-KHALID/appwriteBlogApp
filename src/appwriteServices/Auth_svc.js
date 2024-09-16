import Conf from "../Conf-env/Conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
 
  Client = new Client();
  account;

  constructor() {
    this.Client
        .setEndpoint(Conf.appwriteUrl)
        .setProject(Conf.appwriteProjectId);
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
        console.log(userAccount);
      //   // call another method like login
        return this.login({email, password})
        
      } else {
        return userAccount;

      //   //will see later
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession( email,  password
      );


    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(){
        try {
          return await this.account.get();
          
        } catch (error) {
            console.log('error occur in getCurrentUser:', error);
        }
        
        return null;
  }

  async logOut(){
    try {
      return  await this.account.deleteSessions();

    } catch (error) {
        throw error
    }
  }
}

const authservice = new AuthService();
export default authservice;
