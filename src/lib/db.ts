import { AdapterUser } from "next-auth/adapters";
import { AppUser } from "./types";

// lib/db.ts
export const SERVER_URL = process.env.SERVER_URL || `http://localhost:3000/api`;

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserWithoutPassword = Omit<User, "password">;

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await fetch(
      `${SERVER_URL}/users?email=${encodeURIComponent(email)}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}

export async function findUserByToken(token: string): Promise<AppUser | null> {
  try {
    const response = await fetch(
      `${SERVER_URL}/users?id=${token}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error("Error finding user:", error);
    return null;
  }
}
export async function createUser(user: AdapterUser): Promise<AppUser> {
  try {
       
    const createResponse = await fetch(`${SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if (!createResponse.ok) {
      throw new Error("Failed to create user");
    }
    
    return user as AppUser;
  } catch (error) {
    console.error("Error creating user:", error);
      throw new Error("Failed to create user");
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${SERVER_URL}/users`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}