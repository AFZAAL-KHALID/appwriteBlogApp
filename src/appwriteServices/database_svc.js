import Conf from "../Conf-env/Conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class databaseAndBucket_SVCS {
     client = new Client()
     databases;
     bucket;

     constructor(){
        this.client
        .setEndpoint(Conf.appwriteUrl)
        .setProject(Conf.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client);
     }
// My function    1st CreteDocuments 
     async createPost(slug, title, content, featuredImage, status, userId){
       try {
        await this.databases.createDocument(
            Conf.appwriteDatabaseId,
            Conf.appwriteCollectionId, 
            slug, //as a unique Id
            {title, slug, content, featuredImage, status, userId}
        )

       } catch (error) {
        throw error
       }
     }

     async updataPost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,
                {title, content, featuredImage, status}

                
            );
            
        } catch (error) {
            
        }
     }

     async deletePost(slug){
        try {
           return await this.databases.deleteDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            throw error
        }
     }

     async getPost(slug){
        try {
          return  await this.databases.getDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
     }

     async  getPosts(){
        return await this.databases.listDocuments(
            Conf.appwriteDatabaseId,
            Conf.appwriteCollectionId,
            [
                Query.equal('status', "active")
            ]
        ) 
     } 

// file upload service
}


const databaseSvcs = new databaseAndBucket_SVCS()
export default databaseSvcs