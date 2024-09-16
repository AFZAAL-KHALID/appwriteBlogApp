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
     async createPost({title, slug, content, featuredImage, status, userID}){
       try {
        const response = await this.databases.createDocument(
            Conf.appwriteDatabaseId,
            Conf.appwriteCollectionId, 
            slug, //as a unique Id
            {title, content, featuredImage, status, userID}
        )
        if (response) {
            console.log('new document created', response);
            return response
        }

       } catch (error) {
        console.log('error in creating post/Document',error);
        
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

// file upload service    (idioly should be seperately)
     async uploadFile (file){
        try {
          const response = await this.bucket.createFile(
                Conf.appwriteBucketId,
                ID.unique(),
                file
            )
            if (response) {
                console.log('response successfully:', response);
                return response
            }
        } catch (error) {
           console.log('File upload failed:', error.message);
        }
     }

     async deleteFile(fileId){
        try {
         return await this.bucket.deleteFile(
            Conf.appwriteBucketId,
            fileId
         )
        } catch (error) {
            throw error
        }
     }

     previewFile(fileId){
            return this.bucket.getFilePreview(
                Conf.appwriteBucketId,
                fileId
            )
     }
}


const databaseSvcs = new databaseAndBucket_SVCS()
export default databaseSvcs