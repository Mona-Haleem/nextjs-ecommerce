// lib/db.ts
const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

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
      `${JSON_SERVER_URL}/users?email=${encodeURIComponent(email)}`
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

export async function findUserByToken(token: string): Promise<User | null> {
  try {
    const response = await fetch(
      `${JSON_SERVER_URL}/users?id=${token}`
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
export async function createUser(user: User): Promise<User | null> {
  try {
       
    const createResponse = await fetch(`${JSON_SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if (!createResponse.ok) {
      throw new Error("Failed to create user");
    }
    
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${JSON_SERVER_URL}/users`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
}