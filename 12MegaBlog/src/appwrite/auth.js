// import conf from '../conf/conf.js';
// import { Client, Account, ID } from "appwrite";

// export class AuthService{
//     client = new Client();
//     account;

//     constructor() { //whenever we call the object: authServices, then only client & account should be made & so, we made a constructor which works only when we make an object using this AuthServices class
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
//     }

//     async createAccount({email,password,name}) {
//        try {
//            const userAccount = await this.account.create(ID.unique(), email, password, name)
//            if (userAccount) { // if userAccount is created then call the logIn method
//                // calling logIn method
//                 return this.login({email, password})
//            } else {
//                return userAccount
//            }
//        } 
//        catch(error){
//            throw error           
//        }
//     }

//     async login({email,password}) {
//         try {
//             return await this.account.createEmailPasswordSession(email,password);
//         } catch (error) {
//             throw error
//         }
//     }

//     async getCurrentUser() {
//         try {
//             return await this.account.get()
//         } catch (error) {
//             console.log("Appwrite service :: getCurrentUser :: error",error);
//         }

//         return null
//     }

//     async logout() {
//         try {
//             return await this.account.deleteSessions()
//         } catch (error) {
//             console.log("Appwrite service :: logout :: error",error);
//         }
//     }
// }

// const authService = new AuthService()  
// // authService is an object made from the class AuthService. Hence, we can use authService to get methods made inside AuthService

// export default authService

import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            console.log(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

