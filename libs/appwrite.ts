import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "",
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM || "",
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "",
  dbId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "",
  collectionUsersId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID || "",
  collectionVideosId:
    process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID || "",
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_COLLECTION_ID || "",
};

const {
  endpoint,
  platform,
  project,
  collectionUsersId,
  collectionVideosId,
  dbId,
  storageId,
} = config;

const appwrite = new Client();

appwrite.setEndpoint(endpoint).setProject(project).setPlatform(platform);

const account = new Account(appwrite);
const avatars = new Avatars(appwrite);
const databases = new Databases(appwrite);

export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      dbId,
      collectionUsersId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(dbId, collectionUsersId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
