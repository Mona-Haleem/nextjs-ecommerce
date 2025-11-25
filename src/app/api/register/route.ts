import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { createUser, findUserByEmail } from '@/lib/data/user';

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json();

    // Validate input
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password (do it here on the server, not on the client!)
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
      emailVerified: null,
      provider: 'credentials',
      providerAccountId: "",
    });

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}