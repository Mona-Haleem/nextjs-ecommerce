import { kv } from ".";
import { AppUser, User } from "../types";

// Initialize kv

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const userId = await kv.get<string>(`email:${email}`);
    if (!userId) return null;
    return await kv.get<User>(`user:${userId}`);
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}
export async function findUserByProviderId(
  provider: string,
  providerAccountId: string
): Promise<User | null> {
  try {
    // Use a single key combining provider and account ID
    const key = `provider:${provider}:${providerAccountId}`;
    const userId = await kv.get<string>(key);
    if (!userId) return null;

    return await kv.get<User>(`user:${userId}`);
  } catch (error) {
    console.error("Error finding user by provider ID:", error);
    return null;
  }
}

export async function findUserById(id: string): Promise<AppUser | null> {
  try {
    return await kv.get<AppUser>(`user:${id}`);
  } catch (error) {
    console.error("Error finding user by id:", error);
    return null;
  }
}

export async function createUser(
  user: AppUser | User | Omit<AppUser, "id">
): Promise<AppUser> {
  try {
    // Check if user already exists
    const existing = await findUserByEmail(user.email || "");
    if (existing) {
      // console.log("creating new user:", "user already exist ");

      throw new Error("User already exists");
    }

    const newUser: User | AppUser = {
      id: crypto.randomUUID(),
      username: user.username,
      email: user.email,
      password: user.password,
      emailVerified: user.emailVerified || null,
      provider: user.provider,
      providerAccountId: user.providerAccountId,
    };
    // console.log("creating new user:", newUser);

    // Store user
    await kv.set(`user:${newUser.id}`, newUser);
    // Store email->id mapping
    await kv.set(`email:${newUser.email}`, newUser.id);

    return newUser as AppUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User | null> {
  try {
    const user = await kv.get<User>(`user:${id}`);
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    await kv.set(`user:${id}`, updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const keys = await kv.keys("user:*");
    const users = await Promise.all(keys.map((key) => kv.get<User>(key)));
    return users.filter((user): user is User => user !== null);
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}
