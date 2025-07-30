import conf from "./conf";
import { ID, Databases, Storage, Query, Client, Account } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  databases
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({title, slug, content, featuredImage, status, userId}) {
    try {
        return await this.databases.createDocument(
            conf.appwriteCollectionId,
            conf.appwriteDatabaseId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )        
    } catch (error) {
        console.log("Appwrite service :: createPost :: Error : ", error);
    }
  }


  async updatePost(slug, {title, content, featuredImage, status}) {
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
        
    } catch (error) {
        console.log("Appwrite service :: updatePost :: Error ", error);        
    }
  }

  async deletePost(slug) {
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;        
    } catch (error) {
        console.log("Appwrite Service :: deletePost :: Error ", error);
        return false;
    }
  }

  async getPost(slug) {
    try {
        return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )      
    } catch (error) {
        console.log("Appwrite Service :: getPost :: Error ", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )                
    } catch (error) {
        console.log("Appwrite Service :: getPosts :: Error ", error);
        return falsel;  
    }
  }


  // file upload service
  async uploadFile(file) {
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )        
    } catch (error) {
        console.log("Appwrite Service :: uploadFile :: Error ", error);
        return false;     
    }
  }

  async deleteFile(fileId) {
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true;
    } catch (error) {
        console.log("Appwrite Service :: deleteFile :: Error ", error);
        return false;        
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
  }

}

const service = new Service();
export default service;
