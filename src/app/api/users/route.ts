import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
} from "@/lib/data/user";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (email) {
      const user = await findUserByEmail(email);
      if (!user) {
        return NextResponse.json([]);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return NextResponse.json([safeUser]);
    }

    if (id) {
      const user = await findUserById(id);
      if (!user) {
        return NextResponse.json([]);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return NextResponse.json([safeUser]);
    }

    // Return all users (without passwords for security)
    const users = await getAllUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(safeUsers);
  } catch (error) {
     console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, id, emailVerified } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Hash password if provided
    const hashedPassword = password ? await hash(password, 10) : undefined;

    // Create user (this will throw if user exists)
    const newUser = await createUser({
      id,
      username: name || "",
      email,
      password: hashedPassword,
      emailVerified: emailVerified || null,
    });

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = newUser;
    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);

    if (error instanceof Error && error.message === "User already exists") {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
