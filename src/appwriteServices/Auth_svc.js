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
        return userAccount;
        // call another method like login
      } else {
        // return userAccount;
        console.log("sorry some problem accurd");

        //will see later
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession( "email",  "password"
      );


    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(){
        try {
           const userSessionValid =  await this.account.get()
          if (userSessionValid) {
            return userSessionValid
          }  else{
            return null
          }
        } catch (error) {
            throw error
        }
  }

  async logOut(){
    try {
      return  await account.deleteSessions();

    } catch (error) {
        throw error
    }
  }
}

const authservice = new AuthService();
export default authservice;
